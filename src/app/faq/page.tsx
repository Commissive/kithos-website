import { redirect } from "next/navigation";

// The FAQ section was retired in favour of answers carried in-context across
// the page. Keep the legacy /faq route alive by sending it home.
export default function FAQPage() {
  redirect("/");
}
