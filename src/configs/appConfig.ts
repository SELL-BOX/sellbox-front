export const HTTP_API_SERVER = getConfig().API_SERVER

interface AppConfig {
  API_SERVER?: string
}

function getConfig(): AppConfig {
  if (typeof window !== 'undefined') return (window as any)?.__ENV as AppConfig
  return {}
}
