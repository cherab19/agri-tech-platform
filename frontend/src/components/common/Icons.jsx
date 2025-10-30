import React from 'react'

export const ListIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <rect x="3" y="5" width="3" height="3" fill="currentColor" />
    <rect x="3" y="11" width="3" height="3" fill="currentColor" />
    <rect x="3" y="17" width="3" height="3" fill="currentColor" />
    <rect x="8" y="5" width="13" height="2" rx="1" fill="currentColor" opacity="0.9" />
    <rect x="8" y="11" width="13" height="2" rx="1" fill="currentColor" opacity="0.8" />
    <rect x="8" y="17" width="13" height="2" rx="1" fill="currentColor" opacity="0.7" />
  </svg>
)

export const CartIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <path d="M6 6h15l-1.5 9h-11L6 6z" fill="currentColor" opacity="0.95" />
    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
  </svg>
)

export const MobileIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <rect x="7" y="2" width="10" height="20" rx="2" fill="currentColor" />
    <circle cx="12" cy="18" r="1" fill="#fff" opacity="0.9" />
  </svg>
)

export const TruckIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <rect x="1" y="4" width="13" height="10" rx="1" fill="currentColor" />
    <rect x="14" y="8" width="7" height="6" rx="1" fill="currentColor" opacity="0.95" />
    <circle cx="6" cy="18" r="1.5" fill="currentColor" />
    <circle cx="17" cy="18" r="1.5" fill="currentColor" />
  </svg>
)

export const ChartIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <rect x="4" y="12" width="3" height="7" rx="1" fill="currentColor" />
    <rect x="10.5" y="8" width="3" height="11" rx="1" fill="currentColor" />
    <rect x="17" y="5" width="3" height="14" rx="1" fill="currentColor" />
  </svg>
)

export const CommentsIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <path d="M21 6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3v3l4-3h6a2 2 0 0 0 2-2V6z" fill="currentColor" />
  </svg>
)

export default {
  ListIcon,
  CartIcon,
  MobileIcon,
  TruckIcon,
  ChartIcon,
  CommentsIcon
}
