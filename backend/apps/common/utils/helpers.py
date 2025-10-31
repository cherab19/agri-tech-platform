from typing import Optional


def get_client_ip(request) -> Optional[str]:
    """Return client IP address from request, safe for development.

    This matches common patterns used across Django projects: check
    X-Forwarded-For header first, then REMOTE_ADDR.
    """
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        # X-Forwarded-For may contain multiple IPs, client is first
        ip = x_forwarded_for.split(',')[0].strip()
        return ip
    return request.META.get('REMOTE_ADDR')
