from django.utils import translation


class LocalizationMiddleware:
    """Simple localization middleware placeholder.

    For development this will attempt to set language from Accept-Language
    header if present; otherwise it is a no-op. Real implementation may
    use user profile or path prefix.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        lang = request.META.get('HTTP_ACCEPT_LANGUAGE')
        if lang:
            # Use first language code
            code = lang.split(',')[0].split('-')[0]
            try:
                translation.activate(code)
                request.LANGUAGE_CODE = translation.get_language()
            except Exception:
                pass
        response = self.get_response(request)
        translation.deactivate()
        return response
