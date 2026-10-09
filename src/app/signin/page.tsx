import SignInForm from "@/components/SignInForm";

export const metadata = { title: "সাইন ইন | বাজার দর" };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL?: string; reason?: string }>;
}) {
  const { callbackURL, reason } = await searchParams;

  // shudhu nijer site er path e redirect hobe
  const safeUrl =
    callbackURL && callbackURL.startsWith("/") && !callbackURL.startsWith("//")
      ? callbackURL
      : "/";

  return <SignInForm callbackURL={safeUrl} reason={reason} />;
}