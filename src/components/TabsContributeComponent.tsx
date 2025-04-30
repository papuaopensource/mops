import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Code, Share2, Heart, Github } from "lucide-react";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  target?: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ 
  href, 
  children, 
  target = "_blank" 
}) => {
  return (
    <a href={href} target={target} rel="noreferrer">
      {children}
    </a>
  );
};

const ContributeTabs: React.FC = () => {
  return (
    <Tabs defaultValue="kirim-mop" className="w-full">
      <TabsList className="w-full grid grid-cols-3 mb-5 bg-gray-100 p-1 rounded h-12">
        <TabsTrigger value="kirim-mop" className="data-[state=active]:bg-white rounded-md py-2">Kirim Mop</TabsTrigger>
        <TabsTrigger value="bantu-website" className="data-[state=active]:bg-white rounded-md py-2">Bantu Website</TabsTrigger>
        <TabsTrigger value="sebarkan" className="data-[state=active]:bg-white rounded-md py-2">Sebarkan</TabsTrigger>
      </TabsList>

      {/* Kirim Mop Section */}
      <TabsContent value="kirim-mop">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span>Kirim Mop Papua</span>
            </CardTitle>
            <CardDescription>
              Bagikan cerita lucu atau mop Papua untuk dinikmati banyak orang
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Format Mop:</h3>
              <p className="mb-4">
                Mop adalah cerita ringan yang biasanya terdiri dari narasi dan
                dialog. Gunakan format berikut untuk memudahkan pembacaan:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>Narasi:</strong> Penjelasan cerita atau kejadian
                </li>
                <li>
                  <strong>Dialog:</strong> Percakapan antar tokoh yang seru dan menghibur
                </li>
              </ul>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Contoh:</h3>
              <div className="space-y-3 text-sm">
                <p className="italic">
                  [narasi] Suatu hari di kampung, anak-anak muda rencana latihan
                  vokal grup di gereja. Tapi karena waktu mepet, mereka cuma
                  sempat latihan sekali saja.
                </p>

                <p className="italic">
                  [dialog - Pendeta] "Eh, kam punya nama vokal grup apa?"
                </p>
                <p className="italic">
                  [dialog - Tinus] "Vokal Grup ini namanya TARMUDI."
                </p>

                <p className="italic">
                  [narasi] Pendeta penasaran jadi pendeta tanya lebih lanjut...
                </p>

                <p className="italic">
                  [dialog - Pendeta] "Oh, TARMUDI itu apa singkatannya?"
                </p>
                <p className="italic">[dialog - Tinus] "TARu MUKa DImana.. 😁🤣"</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Cara Kirim Mop:</h3>
              <ol className="list-decimal pl-5 space-y-2 mb-6">
                <li>
                  Siapkan file .txt, .docs, atau .pdf yang berisi mop Anda
                  sesuai dengan format di atas
                </li>
                <li>Unggah file tersebut melalui Google Form</li>
              </ol>
              <div className="flex justify-center">
                <ExternalLink href="https://forms.gle/hB9peLVjARqvPuEJ7">
                  <Button className="gap-2 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    Kirim Mop Anda di sini
                  </Button>
                </ExternalLink>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Mop yang dikirimkan akan kami periksa terlebih dahulu sebelum
                dipublikasikan di situs.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Bantu Website Section */}
      <TabsContent value="bantu-website">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              <span>Bantu Perkembangan Website</span>
            </CardTitle>
            <CardDescription>
              Kontribusi teknis untuk membantu pengembangan situs Mops Papua
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              Selain mengirimkan mop, Anda juga bisa membantu dengan cara
              teknis:
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <div
                  className="bg-background rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3"
                >
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="font-medium mb-2">Perbaiki Bug</h3>
                <p className="text-sm text-muted-foreground">
                  Membantu memperbaiki bug atau masalah lainnya di situs
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg text-center">
                <div
                  className="bg-background rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3"
                >
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="font-medium mb-2">Berikan Saran</h3>
                <p className="text-sm text-muted-foreground">
                  Memberikan saran atau ide fitur baru untuk pengembangan
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg text-center">
                <div
                  className="bg-background rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3"
                >
                  <Github className="h-6 w-6" />
                </div>
                <h3 className="font-medium mb-2">Kirim Kode</h3>
                <p className="text-sm text-muted-foreground">
                  Mengirimkan kode di GitHub untuk pengembangan situs
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button variant="outline" className="gap-2">
                <Github className="h-4 w-4" />
                <ExternalLink href="https://github.com/papuaopensource/mops">
                  Kunjungi GitHub Kami
                </ExternalLink>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Sebarkan Section */}
      <TabsContent value="sebarkan">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              <span>Sebarkan ke Komunitas</span>
            </CardTitle>
            <CardDescription>
              Bantu menyebarkan Mops Papua ke lebih banyak orang
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>Anda juga bisa berkontribusi dengan cara yang sangat mudah:</p>

            <div className="bg-muted p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-4">Bagikan Situs Ini</h3>
              <p className="mb-6">
                Ceritakan tentang Mops Papua dan ajak lebih banyak orang untuk
                ikut berkontribusi
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => {
                    const url = "https://mops.web.id";
                    const text = "Mops Papua - Kumpulan cerita lucu khas Papua. Mari nikmati dan lestarikan mop Papua!";
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-facebook"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                    ></path>
                  </svg>
                  Facebook
                </Button>

                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => {
                    const url = "https://mops.web.id";
                    const text = "Mops Papua - Kumpulan cerita lucu khas Papua. Mari nikmati dan lestarikan mop Papua! #MopsPapua #CeritaLucu";
                    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-twitter-x"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"
                    ></path>
                  </svg>
                  Twitter
                </Button>

                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => {
                    const url = "https://mops.web.id";
                    const text = "Mops Papua - Kumpulan cerita lucu khas Papua. Mari nikmati dan lestarikan mop Papua bersama!";
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, '_blank');
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-whatsapp"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
                    ></path>
                  </svg>
                  WhatsApp
                </Button>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Terima kasih atas kontribusi Anda! Mari bersama-sama menjaga dan
                menyebarkan kebahagiaan Papua!
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ContributeTabs;