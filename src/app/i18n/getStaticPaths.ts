export function getStaticPaths() {
  return [{ params: { locale: 'en' } }, { params: { locale: 'ru' } }]
}
