/**
 * File Validation Utility
 * User Story 1.1: 文件上传 - 验证逻辑
 */

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

// File constraints
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXTENSIONS = ['.json'];
const ALLOWED_MIME_TYPES = ['application/json', 'application/octet-stream'];

/**
 * Validate file extension
 */
export function validateFileExtension(filename: string): ValidationResult {
  if (!filename || typeof filename !== 'string') {
    return { valid: false, error: '文件名不能为空' };
  }
  
  const extension = filename.toLowerCase().slice(filename.lastIndexOf('.'));
  
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return { 
      valid: false, 
      error: `不支持的文件格式。只支持: ${ALLOWED_EXTENSIONS.join(', ')}` 
    };
  }
  
  return { valid: true };
}

/**
 * Validate file size
 */
export function validateFileSize(size: number): ValidationResult {
  if (typeof size !== 'number' || size <= 0) {
    return { valid: false, error: '文件大小无效' };
  }
  
  if (size > MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: `文件大小超过限制。最大允许: ${MAX_FILE_SIZE / 1024 / 1024}MB` 
    };
  }
  
  return { valid: true };
}

/**
 * Validate file MIME type
 */
export function validateFileMimeType(mimeType: string): ValidationResult {
  if (!mimeType || typeof mimeType !== 'string') {
    return { valid: false, error: '文件类型不能为空' };
  }
  
  // Normalize MIME type
  const normalizedType = mimeType.toLowerCase();
  
  if (!ALLOWED_MIME_TYPES.includes(normalizedType)) {
    return { 
      valid: false, 
      error: `不支持的文件类型。只支持: ${ALLOWED_MIME_TYPES.join(', ')}` 
    };
  }
  
  return { valid: true };
}

/**
 * Validate entire file
 */
export function validateFile(metadata: FileMetadata): ValidationResult {
  // Validate extension first
  const extensionResult = validateFileExtension(metadata.name);
  if (!extensionResult.valid) {
    return extensionResult;
  }
  
  // Validate size
  const sizeResult = validateFileSize(metadata.size);
  if (!sizeResult.valid) {
    return sizeResult;
  }
  
  // Validate MIME type (optional warning)
  const mimeResult = validateFileMimeType(metadata.type);
  if (!mimeResult.valid) {
    return mimeResult;
  }
  
  return { valid: true };
}

/**
 * Get file metadata from uploaded file
 */
export function getFileMetadata(file: { name: string; size?: number; type?: string }): FileMetadata {
  return {
    name: file.name,
    size: file.size || 0,
    type: file.type || 'application/octet-stream',
  };
}
