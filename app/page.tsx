import SocketConnect from "@/components/SokcetConnect";

export default function Home() {
  console.log('render')
  return (
    <div className="pl-3 pr-3 pt-5 font-[family-name:var(--font-geist-sans)]">
      <SocketConnect />
    </div>
  );
}
