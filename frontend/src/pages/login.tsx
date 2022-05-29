import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import useLoginMutation from '@api/mutations/useLoginMutation';
import { Anchor } from '@common/components/atoms/anchor/anchor';
import Seo from '@common/components/atoms/seo/seo';
import LoadableButton from '@common/components/molecules/loadable-button/loadable-button';
import { saveJWTOnLocalStorage } from '@common/utils/localStorage';
import RHFInput from '@modules/forms/fields/input/rhf-input';

type FormValues = {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
};

const Login: NextPage = () => {
    const router = useRouter();
    const methods = useForm<FormValues>();
    const { handleSubmit } = methods;

    const { isLoading, isSuccess, mutate } = useLoginMutation({
        onError: () => {
            toast.error('Hubo un error al iniciar sesión');
        },
        onSuccess: (data) => {
            saveJWTOnLocalStorage(data);
            router.push('/');
        },
    });

    const onSubmit = (values: FormValues) => {
        mutate(values);
    };

    return (
        <>
            <Seo />

            <main className="flex min-h-screen">
                <div className="w-1/2 bg-gray-100 pl-container flex justify-center items-center">
                    <Image src="/fintual-animated.gif" width={540} height={540} alt="" />
                </div>

                <div className="flex-1 flex items-center pl-16 pr-container">
                    <div className="w-full">
                        <h1 className="font-bold text-2xl mb-6">Bienvenido de nuevo</h1>
                        <p className="mb-6">Ingresa tus datos para iniciar sesión</p>

                        <FormProvider {...methods}>
                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                <RHFInput name="email" type="email" placeholder="Email" />
                                <RHFInput
                                    name="password"
                                    type="password"
                                    placeholder="Contraseña"
                                />

                                <LoadableButton
                                    block
                                    rounded="sm"
                                    className="w-full"
                                    loading={isLoading || isSuccess}
                                    type="submit"
                                >
                                    Iniciar Sesión
                                </LoadableButton>
                            </form>
                        </FormProvider>

                        <small className="text-center block pt-4">
                            ¿Aún no te inscribiste?{' '}
                            <Anchor className="text-primary font-bold" href="/register">
                                Registrate aquí
                            </Anchor>
                        </small>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Login;
