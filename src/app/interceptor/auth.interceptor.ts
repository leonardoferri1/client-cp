import type { HttpHandlerFn, HttpRequest } from '@angular/common/http'

export function authTokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const infrastructure = localStorage.getItem('@siafic:infrastructure_token')
  const authorization = localStorage.getItem('@siafic:authorization_token')

  if (infrastructure) {
    const newReq = req.clone({
      headers: req.headers.append('Infrastructure', `Bearer ${infrastructure}`),
      setHeaders: {
        Authorization: `Bearer ${authorization}`,
      },
    })

    return next(newReq)
  }

  return next(req)
}
