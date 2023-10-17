"use client";

import { 
  HomeIcon,
  ListOrderedIcon, 
  LogInIcon, 
  MenuIcon, 
  PercentIcon, 
  ShoppingCartIcon 
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage} from "./avatar"
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "./separator";

const Header = () => {
  const { status, data } = useSession()

  const handlerLoginClick = async () => {
    await signIn()
  };

  const handlerLogoutClick = async () => {
    await signOut();
  }

  return ( 
    <Card className="flex items-center justify-between p-[1.875rem]"> 
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>

          { status === 'authenticated' && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>

                  {data.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>

                <div className="flex flex-col">
                  <p className="font-medium">{data.user.name}</p>
                  <p className="text-sm opacity-75">Boas compras!</p>
                </div>
              </div>

              <Separator />
            </div>
          )}

          <div className="flex flex-col gap-3 mt-2">
            { status === 'unauthenticated' && (
              <Button 
                onClick={handlerLoginClick} 
                variant="outline" 
                className="w-full justify-start gap-2"
              >
                <LogInIcon size={16}/>
                Fazer Login
              </Button>
            )}

            { status === 'authenticated' && (
              <Button 
                onClick={handlerLogoutClick} 
                variant="outline" 
                className="w-full justify-start gap-2"
              >
                <LogInIcon size={16}/>
                Fazer Logout
              </Button>
            )}

            <Button variant="outline" className="w-full justify-start gap-2">
              <HomeIcon size={16}/>
              Inicio
            </Button>

            <Button variant="outline" className="w-full justify-start gap-2">
              <PercentIcon size={16}/>
              Ofertas
            </Button>

            <Button variant="outline" className="w-full justify-start gap-2">
              <ListOrderedIcon size={16}/>
              Catálogo
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="font-semibold text-lg">
        <span className="text-primary">FSW</span> Store
      </h1> 

      <Button size="icon" variant="outline">
        <ShoppingCartIcon />
      </Button>
      
    </Card>
   );
}
 
export default Header;