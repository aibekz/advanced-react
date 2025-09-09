import { Suspense } from "react";

function fetchUser(): { read: () => { name: string } } {
  let status = "pending";
  let result: any;
  const suspender = new Promise((r) =>
    setTimeout(() => { status = "success"; result = { name: "Aibek" }; r(null); }, 1200)
  );
  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "success") return result;
      throw result;
    },
  };
}
const resource = fetchUser();

function UserCard() {
  const user = resource.read(); // throws while pending → triggers Suspense
  return <h3>Hi, {user.name} 👋</h3>;
}

export default function SuspenseDemo() {
  return (
    <Suspense fallback={<p>Loading profile…</p>}>
      <UserCard />
    </Suspense>
  );
}
