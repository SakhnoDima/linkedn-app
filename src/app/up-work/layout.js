export default async function RootLayout({ children }) {
  return (
    <div className="flex flex-row">
      <div className="flex-3/4">{children}</div>
      <div className="border flex-1/4 ">list</div>
    </div>
  );
}
