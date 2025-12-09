export function formatDate(dateString, locale = 'en-US', options = {}) {
  if (!dateString) return '';

  const date = new Date(dateString);

  // дефолтный формат
  const formatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    ...options,
  };

  return new Intl.DateTimeFormat(locale, formatOptions).format(date);
}