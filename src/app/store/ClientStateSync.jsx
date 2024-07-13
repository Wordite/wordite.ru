import { $locale } from "./locale"

const ClientStateSync = ({ locale }) => {
  $locale.set(locale)
  return ""
}

export default ClientStateSync
