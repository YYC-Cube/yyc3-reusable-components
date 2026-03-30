import React from 'react';

export function Sidebar({
  children,
  ...props
}: { children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function SidebarContent({
  children,
  ...props
}: { children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function SidebarHeader({
  children,
  ...props
}: { children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function SidebarFooter({
  children,
  ...props
}: { children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function SidebarMenu({
  children,
  ...props
}: { children?: React.ReactNode } & React.HTMLAttributes<HTMLUListElement>) {
  return <ul {...props}>{children}</ul>;
}

export function SidebarMenuItem({
  children,
  ...props
}: { children?: React.ReactNode } & React.HTMLAttributes<HTMLLIElement>) {
  return <li {...props}>{children}</li>;
}

export function SidebarMenuButton({
  children,
  ...props
}: { children?: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props}>{children}</button>;
}
