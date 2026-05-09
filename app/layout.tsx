import Script from 'next/script';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script id="mcjs" strategy="afterInteractive">
          {`!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/30faced646e9e7815705d4dda/8ab535b9c79b21b90b93a407c.js");`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
