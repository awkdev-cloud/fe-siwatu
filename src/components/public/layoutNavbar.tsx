import Header from "./header";
import Footer from "./footer";

type ContactResponse = {
  message?: string;
  data?: {
    whatsapp?: {
      display?: string;
      link?: string;
    };
    location?: {
      name?: string;
    };
  };
};

async function getContact(): Promise<ContactResponse["data"]> {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) return undefined;

  try {
    const res = await fetch(`${baseUrl}/contact`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) return undefined;

    const json = (await res.json()) as ContactResponse;
    return json.data;
  } catch {
    return undefined;
  }
}

type LayoutNavbarProps = {
  children: React.ReactNode;
};

export default async function LayoutNavbar({ children }: LayoutNavbarProps) {
  const contact = await getContact();

  return (
    <>
      <Header whatsappLink={contact?.whatsapp?.link} />

      <div className="min-h-screen">{children}</div>

      <Footer
     whatsappDisplay={contact?.whatsapp?.display}
     whatsappLink={contact?.whatsapp?.link}
     locationName={contact?.location?.name}
     />
    </>
  );
}