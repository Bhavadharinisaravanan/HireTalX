import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

/**
 * Extract plain text from PDF buffer
 * @param {Buffer} buffer 
 * @returns {Promise<string>}
 */
export async function extractTextFromPDF(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text || '';
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF document. Please verify file integrity.');
  }
}

/**
 * Extract plain text from DOCX buffer
 * @param {Buffer} buffer 
 * @returns {Promise<string>}
 */
export async function extractTextFromDOCX(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || '';
  } catch (error) {
    console.error('Error parsing DOCX:', error);
    throw new Error('Failed to parse DOCX document. Please verify file integrity.');
  }
}

/**
 * Parse uploaded file based on mimetype/extension
 * @param {Object} file - Multer file object
 * @returns {Promise<string>}
 */
export async function parseDocument(file) {
  const mime = file.mimetype;
  const originalName = file.originalname.toLowerCase();

  if (mime === 'application/pdf' || originalName.endsWith('.pdf')) {
    return await extractTextFromPDF(file.buffer);
  } else if (
    mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    originalName.endsWith('.docx')
  ) {
    return await extractTextFromDOCX(file.buffer);
  } else if (mime === 'text/plain' || originalName.endsWith('.txt')) {
    return file.buffer.toString('utf-8');
  } else {
    // Attempt text decode as fallback
    try {
      const text = file.buffer.toString('utf-8');
      if (text && text.trim().length > 10) return text;
    } catch {
      // ignore
    }
    throw new Error(`Unsupported file type: ${file.originalname}. Please upload a PDF, DOCX, or TXT file.`);
  }
}
