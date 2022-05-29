import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import useAnswerStageFieldMutation from '@api/mutations/useAnswerStageFieldMutation';
import useFieldsByStageIdQuery from '@api/queries/useFieldsByStageIdQuery';
import useMyUserQuery from '@api/queries/useMyUserQuery';
import useStagesQuery from '@api/queries/useStagesQuery';
import Seo from '@common/components/atoms/seo/seo';
import LoadableButton from '@common/components/molecules/loadable-button/loadable-button';
import ViewError from '@common/components/molecules/view-error/view-error';
import ViewLoading from '@common/components/molecules/view-loading/view-loading';
import FormLabel from '@modules/forms/fields/form-label';
import RHFFormField from '@modules/forms/fields/rhf-form-field';

// sorryyy
type FormValues = {
    [x: string]: string;
};

const StageById: NextPage = () => {
    const router = useRouter();
    const id = router.query.id as string | undefined;

    const {
        data: myUserData,
        isLoading: myUserLoading,
        isError: myUserIsError,
    } = useMyUserQuery();

    const [sendingResponses, setSendingResponses] = useState(false);

    const {
        data: stageFields,
        isLoading: stageFieldsLoading,
        isError: stageFieldsError,
    } = useFieldsByStageIdQuery(id);

    const {
        data: stages,
        isLoading: stagesLoading,
        isError: stagesError,
    } = useStagesQuery();

    const { mutate } = useAnswerStageFieldMutation();

    const methods = useForm<FormValues>();
    const { handleSubmit } = methods;

    if (stageFieldsLoading || stagesLoading || myUserLoading) {
        return (
            <main>
                <Seo />
                <ViewLoading fullPage />
            </main>
        );
    }

    if (
        !stageFields ||
        stageFieldsError ||
        !stages ||
        stagesError ||
        !myUserData ||
        myUserIsError
    ) {
        return (
            <main>
                <Seo />
                <ViewError fullPage />
            </main>
        );
    }

    const stage = stages.find((stage) => stage.id.toString() === id);
    if (!stage) {
        return (
            <main>
                <Seo />
                <ViewError
                    heading="Etapa no encontrada"
                    subheading="Parece que la etapa que estás buscando no existe"
                    fullPage
                />
            </main>
        );
    }

    const onSubmit = (data: FormValues) => {
        let fieldsTillFinishLoading = 0;

        setSendingResponses(true);
        stageFields.forEach((field) => {
            const value = data[field.id];
            fieldsTillFinishLoading = fieldsTillFinishLoading + 1;

            mutate(
                {
                    owner: myUserData.id.toString(),
                    habana_form_field: field.id.toString(),
                    value,
                },
                {
                    onSuccess: () => {
                        toast.success('Respuestas guardadas');
                        router.push('/');
                    },
                    onError: () => {
                        toast.error(
                            'Hubo un error al enviar tus respuestas. Por favor, intentalo más tarde'
                        );
                        setSendingResponses(false);
                    },
                }
            );
        });
    };

    return (
        <>
            <main>
                <Seo />

                <div className="bg-gray-100 pt-20 pb-10">
                    <div className="container--small">
                        <h1 className="font-bold text-3xl mb-2">{stage.title}</h1>
                        <p className="mb-8">{stage.description}</p>
                    </div>
                </div>

                <div className="container--small pt-10 pb-20">
                    <FormProvider {...methods}>
                        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                            {stageFields.map((field) => {
                                return (
                                    <div className="space-y-2" key={field.id}>
                                        <FormLabel
                                            htmlFor={field.id.toString()}
                                            isRequired={true}
                                        >
                                            {field.title}
                                        </FormLabel>

                                        <RHFFormField field={field} />
                                    </div>
                                );
                            })}

                            <LoadableButton
                                loading={sendingResponses}
                                type="submit"
                                rounded="sm"
                                block
                                className="w-full"
                            >
                                Enviar
                            </LoadableButton>
                        </form>
                    </FormProvider>
                </div>
            </main>
        </>
    );
};

export default StageById;
