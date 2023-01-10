import { HTTP_API_SERVER } from '../configs/appConfig'

export function getThumbnailImage(thumbnailId: string) {
  return HTTP_API_SERVER + '/api/v1/thumbnail/' + thumbnailId
}
