export const transformQuery = (includeString, excludeString) => {
  includeString = includeString.replace(/&/g, 'AND').replace(/\|/g, 'OR');

  const excludeTerms = excludeString.split(',').map(term => term.trim());

  const formattedExcludeTerms = excludeTerms
      .filter(term => term.length > 0)
      .map(term => (term.includes(' ') ? `"${term}"` : term));

  const excludeQuery = `AND NOT (${formattedExcludeTerms.join(' OR ')})`;

  return `${includeString} ${excludeQuery}`;
};
