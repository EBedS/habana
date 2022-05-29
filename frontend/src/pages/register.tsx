import dayjs from 'dayjs';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import useRegisterMutation from '@api/mutations/useRegisterMutation';
import { Anchor } from '@common/components/atoms/anchor/anchor';
import Seo from '@common/components/atoms/seo/seo';
import LoadableButton from '@common/components/molecules/loadable-button/loadable-button';
import { saveJWTOnLocalStorage } from '@common/utils/localStorage';
import RHFDateTimePickerField from '@modules/forms/fields/datepicker/rhf-datepicker';
import RHFInput from '@modules/forms/fields/input/rhf-input';

type FormValues = {
    firstName: string;
    lastName: string;
    birthdate: [string];
    email: string;
    password: string;
};

const Register: NextPage = () => {
    const router = useRouter();
    const methods = useForm<FormValues>();
    const { handleSubmit } = methods;

    const { isLoading, isSuccess, mutate } = useRegisterMutation({
        onError: () => {
            toast.error('Hubo un error al registrarte');
        },
        onSuccess: (data) => {
            saveJWTOnLocalStorage(data);
            router.push('/');
        },
    });

    const onSubmit = (values: FormValues) => {
        mutate({
            first_name: values.firstName,
            last_name: values.lastName,
            birthdate: dayjs(values.birthdate[0]).format('YYYY-MM-DD'),
            email: values.email,
            password: values.password,
        });
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
                        <h1 className="font-bold text-2xl mb-6">Bienvenido a FIN</h1>
                        <p className="mb-6">
                            Vive una gran experiencia en Puerto Natales. 3 meses de
                            intenso codeo. Frio. Una oportunidad unica.
                        </p>

                        <FormProvider {...methods}>
                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                <RHFInput name="firstName" placeholder="Nombre" />
                                <RHFInput name="lastName" placeholder="Apellido" />
                                <RHFDateTimePickerField
                                    name="birthdate"
                                    placeholder="Fecha de Nacimiento"
                                />
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
                                    Inscribirme
                                </LoadableButton>
                            </form>
                        </FormProvider>

                        <small className="text-center block pt-4">
                            ¿Ya tienes una cuenta?{' '}
                            <Anchor className="text-primary font-bold" href="/login">
                                Inicia sesión
                            </Anchor>
                        </small>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Register;
