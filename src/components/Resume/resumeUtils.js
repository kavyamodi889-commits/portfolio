/**
 * Resume helper utilities shared across all templates.
 * Centralizes formatting logic so templates stay clean.
 */

/** Format education year range */
export function formatYears(start, end, status) {
  if (!start && !end) return ''
  const endStr = end ?? (status === 'Currently Pursuing' ? 'Present' : '')
  return `${start ?? ''}${start && endStr ? ' – ' : ''}${endStr}`
}

/** Format contact display URL */
export function cleanUrl(url) {
  return url?.replace(/^https?:\/\//, '') ?? ''
}

/** Check if section should render */
export function shouldShow(data, key) {
  return !!data.sectionVisibility?.[key]
}

/** Filter projects to featured only */
export function featuredProjects(projects) {
  return projects.filter((p) => p.featured)
}
