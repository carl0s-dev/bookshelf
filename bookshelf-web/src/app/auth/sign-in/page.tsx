"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useActionState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { signIn } from "@/interfaces/auth.interface";

function SignIn() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(signIn, undefined);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error, {
        description: state.message,
        position: "bottom-right",
      });
      return;
    }
    if (state?.message) {
      toast.success(state.message);
    }
    if (state?.ok) {
      router.push("/");
    }
  }, [state]);

  return (
    <main className="h-svh flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="flex flex-col space-y-4">
            <div className="space-y-2">
              <Label>Nome de usuário</Label>
              <Input
                type="text"
                name="username"
                placeholder="JohnDoe"
                defaultValue={state?.data ? state.data.username : ""}
              />
              {state?.errors?.username && (
                <p className="text-xs text-red-500">{state.errors.username}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Senha</Label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••••••••••"
                defaultValue={state?.data ? state.data.password : ""}
              />
              {state?.errors?.password && (
                <p className="text-xs text-red-500">{state.errors.password}</p>
              )}
            </div>
            <Button disabled={isPending}>
              {isPending && <Loader2Icon className="animate-spin" />} Enviar
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-center justify-center">
            <Link href={"/auth/sign-up"} className="hover:underline">
              Não tem uma conta? Cadastre-se!
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default SignIn;
