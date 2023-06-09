const IPV6_COMPAT_PREFIX = '::ffff:'

export const checkIPAddress = (ip: string) => {
  return ip.startsWith(IPV6_COMPAT_PREFIX) ? ip.substring(IPV6_COMPAT_PREFIX.length) : ip
}
