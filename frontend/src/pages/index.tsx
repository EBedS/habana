import dayjs from 'dayjs';
import { NextPage } from 'next';

import useMyUserQuery from '@api/queries/useMyUserQuery';
import useStagesAnswersStatusQuery from '@api/queries/useStagesAnswersStatus';
import useStagesQuery, { UseStagesQueryDataItem } from '@api/queries/useStagesQuery';
import { Anchor } from '@common/components/atoms/anchor/anchor';
import Markdown from '@common/components/atoms/markdown/markdown';
import Seo from '@common/components/atoms/seo/seo';
import ViewError from '@common/components/molecules/view-error/view-error';
import ViewLoading from '@common/components/molecules/view-loading/view-loading';

type StageCardProps = {
    stage: UseStagesQueryDataItem;
    stageNumber: number;
    hasAnswered: boolean;
};

enum AvailableStageCardLetterEnum {
    F,
    I,
    N,
}

type AvailableStageCardLetterProps = {
    letter: AvailableStageCardLetterEnum;
};

const AvailableStageCardLetter: React.FC<AvailableStageCardLetterProps> = ({
    letter,
}) => {
    if (letter === AvailableStageCardLetterEnum.F)
        return (
            <svg
                width="75"
                height="127"
                viewBox="0 0 75 127"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 63.1177V0L10.0836 9.59046e-05C15.6295 0.000148775 32.4555 0.0654258 47.4746 0.145156L74.782 0.290121V14.607V28.9239L57.5036 41.983C48.0005 49.1655 38.4102 56.4176 36.1919 58.0988L32.1584 61.1555L53.5792 61.2111L75 61.2667V76.3092V91.3517H53.9608H32.9215V108.449C32.9215 117.852 32.862 125.701 32.7892 125.891C32.6701 126.201 31.0167 126.235 16.3284 126.235H0V63.1177Z"
                    fill="white"
                />
            </svg>
        );

    if (letter === AvailableStageCardLetterEnum.I) {
        return (
            <svg
                width="47"
                height="126"
                viewBox="0 0 47 126"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 93.4659V60.9317H23.0677H46.1354V93.4659V126H23.0677H0V93.4659ZM19.3313 45.6933C15.7981 45.097 12.057 43.4572 9.12851 41.2211C7.25056 39.7872 4.56903 36.8065 3.39658 34.8497C1.13648 31.0776 0.141377 27.3553 0.159175 22.7394C0.17226 19.3475 0.642881 17.0111 1.94138 13.892C3.27559 10.6871 6.22856 6.91877 9.19591 4.63443C16.4888 -0.979792 26.8198 -1.54547 34.9664 3.22336C40.4559 6.4368 44.7113 12.5629 45.8032 18.824C47.9112 30.9123 40.533 42.2627 28.6097 45.274C26.388 45.8351 25.7077 45.9127 23.2077 45.8903C21.6346 45.8763 19.8902 45.7876 19.3313 45.6933V45.6933Z"
                    fill="white"
                />
            </svg>
        );
    }

    if (letter === AvailableStageCardLetterEnum.N) {
        return (
            <svg
                width="76"
                height="126"
                viewBox="0 0 76 126"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 62.9984V0L37.875 0.0551103L75.75 0.110221V62.999V125.888L61.5264 125.944L47.3029 126V93.408V60.816L33.1883 60.8721L19.0737 60.9282L19.0185 93.4625L18.9633 125.997H9.48166H0V62.9984Z"
                    fill="white"
                />
            </svg>
        );
    }

    return null;
};

const StageCard: React.FC<StageCardProps> = ({ stage, stageNumber, hasAnswered }) => {
    const currentDate = dayjs();
    const availableFrom = dayjs(stage.available_from);
    const availableUntil = dayjs(stage.available_until);

    const monthFormatter = new Intl.DateTimeFormat('es', { month: 'short' });

    const availableFromMonth = monthFormatter.format(availableFrom.toDate());
    const availableUntilMonth = monthFormatter.format(availableUntil.toDate());

    if (hasAnswered) {
        let letter = AvailableStageCardLetterEnum.F;

        if (stageNumber === 2) {
            letter = AvailableStageCardLetterEnum.I;
        } else if (stageNumber === 3) {
            letter = AvailableStageCardLetterEnum.N;
        }

        return (
            <li className="border-2 border-gray-100 transition duration-200 relative group hover:border-primary">
                <div className="min-h-full flex flex-col min-w-full bg-primary items-center justify-center px-8 py-10">
                    <AvailableStageCardLetter letter={letter} />

                    <span className="text-white font-bold mt-4">Etapa finalizada</span>
                </div>

                <div className="absolute inset-0 z-index-10 transition duration-200 group-hover:opacity-0 pointer-events-none bg-white px-8 py-4">
                    <div className="space-x-2 mb-4 flex justify-end">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 0C3.58125 0 0 3.58125 0 8C0 12.4187 3.58125 16 8 16C12.4187 16 16 12.4187 16 8C16 3.58125 12.4187 0 8 0ZM8 4C8.55219 4 9 4.44781 9 5C9 5.55219 8.55219 6 8 6C7.44781 6 7 5.55313 7 5C7 4.44687 7.44687 4 8 4ZM9.25 12H6.75C6.3375 12 6 11.6656 6 11.25C6 10.8344 6.33594 10.5 6.75 10.5H7.25V8.5H7C6.58594 8.5 6.25 8.16406 6.25 7.75C6.25 7.33594 6.5875 7 7 7H8C8.41406 7 8.75 7.33594 8.75 7.75V10.5H9.25C9.66406 10.5 10 10.8359 10 11.25C10 11.6641 9.66563 12 9.25 12Z"
                                fill="#727272"
                            />
                        </svg>
                        <span className="text-xs">Etapa finalizada</span>
                    </div>

                    <h2 className="text-lg font-bold mb-4">
                        Etapa {stageNumber} •{' '}
                        <span className="text-sm font-normal">{stage.title}</span>
                    </h2>

                    <div className="text-sm">Felicidades por completar esta fase</div>
                </div>
            </li>
        );
    }

    // not available yet
    if (currentDate < availableFrom) {
        return (
            <li className="border-2 border-gray-100 px-8 py-4 relative bg-gray-100 opacity-50">
                <div className="space-x-2 mb-4 flex justify-end">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 0C3.58125 0 0 3.58125 0 8C0 12.4187 3.58125 16 8 16C12.4187 16 16 12.4187 16 8C16 3.58125 12.4187 0 8 0ZM8 4C8.55219 4 9 4.44781 9 5C9 5.55219 8.55219 6 8 6C7.44781 6 7 5.55313 7 5C7 4.44687 7.44687 4 8 4ZM9.25 12H6.75C6.3375 12 6 11.6656 6 11.25C6 10.8344 6.33594 10.5 6.75 10.5H7.25V8.5H7C6.58594 8.5 6.25 8.16406 6.25 7.75C6.25 7.33594 6.5875 7 7 7H8C8.41406 7 8.75 7.33594 8.75 7.75V10.5H9.25C9.66406 10.5 10 10.8359 10 11.25C10 11.6641 9.66563 12 9.25 12Z"
                            fill="#727272"
                        />
                    </svg>
                    <span className="text-xs">
                        Disponible desde el {availableFrom.date()} de {availableFromMonth}
                    </span>
                </div>

                <h2 className="text-lg font-bold mb-4">
                    Etapa {stageNumber} •{' '}
                    <span className="text-sm font-normal">{stage.title}</span>
                </h2>

                <div className="text-sm">
                    <Markdown>{stage.description}</Markdown>
                </div>
            </li>
        );
    }

    // is available
    if (currentDate >= availableFrom && currentDate < availableUntil) {
        let letter = AvailableStageCardLetterEnum.F;

        if (stageNumber === 2) {
            letter = AvailableStageCardLetterEnum.I;
        } else if (stageNumber === 3) {
            letter = AvailableStageCardLetterEnum.N;
        }

        return (
            <li className="border-2 border-gray-100 transition duration-200 relative group hover:border-primary">
                <Anchor
                    href={`/stage/${stage.id}`}
                    className="min-h-full flex flex-col min-w-full bg-primary items-center justify-center px-8 py-10"
                >
                    <AvailableStageCardLetter letter={letter} />

                    <span className="text-white font-bold mt-4">
                        Comienza la etapa {'>'}
                    </span>
                </Anchor>

                <div className="absolute inset-0 z-index-10 transition duration-200 group-hover:opacity-0 pointer-events-none bg-white px-8 py-4">
                    <div className="space-x-2 mb-4 flex justify-end">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 0C3.58125 0 0 3.58125 0 8C0 12.4187 3.58125 16 8 16C12.4187 16 16 12.4187 16 8C16 3.58125 12.4187 0 8 0ZM8 4C8.55219 4 9 4.44781 9 5C9 5.55219 8.55219 6 8 6C7.44781 6 7 5.55313 7 5C7 4.44687 7.44687 4 8 4ZM9.25 12H6.75C6.3375 12 6 11.6656 6 11.25C6 10.8344 6.33594 10.5 6.75 10.5H7.25V8.5H7C6.58594 8.5 6.25 8.16406 6.25 7.75C6.25 7.33594 6.5875 7 7 7H8C8.41406 7 8.75 7.33594 8.75 7.75V10.5H9.25C9.66406 10.5 10 10.8359 10 11.25C10 11.6641 9.66563 12 9.25 12Z"
                                fill="#727272"
                            />
                        </svg>
                        <span className="text-xs">
                            Disponible hasta el {availableUntil.date()} de{' '}
                            {availableUntilMonth}
                        </span>
                    </div>

                    <h2 className="text-lg font-bold mb-4">
                        Etapa {stageNumber} •{' '}
                        <span className="text-sm font-normal">{stage.title}</span>
                    </h2>

                    <div className="text-sm">
                        <Markdown>{stage.description}</Markdown>
                    </div>
                </div>
            </li>
        );
    }

    // expired
    return (
        <li className="border-2 border-gray-100 px-8 py-4 relative">
            <div className="space-x-2 mb-4 flex justify-end">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8 0C3.58125 0 0 3.58125 0 8C0 12.4187 3.58125 16 8 16C12.4187 16 16 12.4187 16 8C16 3.58125 12.4187 0 8 0ZM8 4C8.55219 4 9 4.44781 9 5C9 5.55219 8.55219 6 8 6C7.44781 6 7 5.55313 7 5C7 4.44687 7.44687 4 8 4ZM9.25 12H6.75C6.3375 12 6 11.6656 6 11.25C6 10.8344 6.33594 10.5 6.75 10.5H7.25V8.5H7C6.58594 8.5 6.25 8.16406 6.25 7.75C6.25 7.33594 6.5875 7 7 7H8C8.41406 7 8.75 7.33594 8.75 7.75V10.5H9.25C9.66406 10.5 10 10.8359 10 11.25C10 11.6641 9.66563 12 9.25 12Z"
                        fill="#727272"
                    />
                </svg>
                <span className="text-xs">Etapa finalizada</span>
            </div>

            <h2 className="text-lg font-bold mb-4">
                Etapa {stageNumber} •{' '}
                <span className="text-sm font-normal">{stage.title}</span>
            </h2>

            <div className="text-sm">
                <Markdown>{stage.description}</Markdown>
            </div>
        </li>
    );
};

const ApplicantDashboard: NextPage = () => {
    const {
        data: myUserData,
        isLoading: myUserLoading,
        isError: myUserIsError,
    } = useMyUserQuery();

    const { data: stages, isLoading, isError } = useStagesQuery();

    const {
        data: stagesAnswersStatus,
        isLoading: stagesAnswersLoading,
        isError: stagesAnswersError,
    } = useStagesAnswersStatusQuery();

    if (isLoading || myUserLoading || stagesAnswersLoading || !stagesAnswersStatus) {
        return (
            <main>
                <Seo />
                <ViewLoading fullPage />
            </main>
        );
    }

    if (!stages || isError || !myUserData || myUserIsError || stagesAnswersError) {
        return (
            <main>
                <Seo />
                <ViewError fullPage />
            </main>
        );
    }

    return (
        <>
            <Seo />
            <main className="bg-gray-100 py-20 min-h-screen">
                <div className="container flex items-center justify-center">
                    <div className="bg-white p-8 w-full">
                        <div className="mb-16">
                            <h1 className="font-bold text-2xl mb-4">
                                Hola {myUserData.first_name}!
                            </h1>
                            <p>El proceso de selección consta de 3 etapas.</p>
                        </div>

                        <ul className="grid grid-cols-3 gap-8">
                            {[...stages]
                                .sort((a, b) => a.sort_order - b.sort_order)
                                .map((stage, index) => {
                                    return (
                                        <StageCard
                                            key={stage.id}
                                            stage={stage}
                                            stageNumber={index + 1}
                                            hasAnswered={
                                                stagesAnswersStatus[stage.id.toString()]
                                            }
                                        />
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ApplicantDashboard;
