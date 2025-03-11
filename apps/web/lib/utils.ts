export const getIdFromPathname = (pathname: string) => {
  const pathnameArray = pathname.split("/")
  return pathnameArray[2] || ""
}

export const getConfirmationCodeFromSearchParams = (searchParams: URLSearchParams) => {
  return searchParams.get("confirmation_code") || ""
}
