export type AppConfig = {
    baseUrl: string
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    // Don't enter slash at end of base url
    baseUrl: 'http://localhost:8140',
    apiPrefix: 'api/v1',
    authenticatedEntryPath: '/onboarding/kyc-form',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig
