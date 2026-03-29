/**
 * Preview and Edit Manager
 * User Story 2.2: 预览编辑
 */

import { ConversationSummary } from './ai-summary';

export interface EditableSummary extends ConversationSummary {
  original: ConversationSummary;
  isModified: boolean;
}

/**
 * Create editable summary from AI-generated summary
 */
export function createEditableSummary(
  summary: ConversationSummary
): EditableSummary {
  return {
    ...summary,
    original: { ...summary },
    isModified: false,
  };
}

/**
 * Update a specific field in the summary
 */
export function updateSummaryField(
  editable: EditableSummary,
  field: keyof ConversationSummary,
  newValue: string
): EditableSummary {
  const updated = {
    ...editable,
    [field]: newValue,
    isModified: true,
  };
  
  return updated;
}

/**
 * Reset specific field to original value
 */
export function resetSummaryField(
  editable: EditableSummary,
  field: keyof ConversationSummary
): EditableSummary {
  return {
    ...editable,
    [field]: editable.original[field],
    isModified: editable.original[field] !== editable[field],
  };
}

/**
 * Reset all fields to original
 */
export function resetAllFields(editable: EditableSummary): EditableSummary {
  return {
    ...editable.original,
    original: editable.original,
    isModified: false,
  };
}

/**
 * Validate summary before saving
 */
export function validateSummary(
  summary: Partial<ConversationSummary>
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check required fields
  if (!summary.userNeeds?.trim()) {
    errors.push('用户需求不能为空');
  }
  
  if (!summary.aiSolutions?.trim()) {
    errors.push('AI解决方案不能为空');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get changes between original and edited
 */
export function getChanges(
  editable: EditableSummary
): Array<{ field: string; before: string; after: string }> {
  const changes: Array<{ field: string; before: string; after: string }> = [];
  
  const fields: (keyof ConversationSummary)[] = [
    'userNeeds',
    'aiSolutions',
    'userPreferences',
    'keyKnowledge',
    'actionItems',
  ];
  
  for (const field of fields) {
    if (editable.original[field] !== editable[field]) {
      changes.push({
        field,
        before: editable.original[field],
        after: editable[field],
      });
    }
  }
  
  return changes;
}

/**
 * Apply edits to final summary
 */
export function applyEdits(editable: EditableSummary): ConversationSummary {
  return {
    userNeeds: editable.userNeeds,
    aiSolutions: editable.aiSolutions,
    userPreferences: editable.userPreferences,
    keyKnowledge: editable.keyKnowledge,
    actionItems: editable.actionItems,
  };
}

/**
 * Create preview text from summary
 */
export function createPreviewText(summary: ConversationSummary): string {
  const sections: string[] = [];
  
  sections.push(`🎯 需求: ${summary.userNeeds}`);
  sections.push(`💡 方案: ${summary.aiSolutions}`);
  sections.push(`👤 偏好: ${summary.userPreferences}`);
  sections.push(`📚 知识: ${summary.keyKnowledge}`);
  sections.push(`🚀 计划: ${summary.actionItems}`);
  
  return sections.join('\n');
}
