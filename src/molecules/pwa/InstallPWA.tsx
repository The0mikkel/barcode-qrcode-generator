import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function InstallPWA() {
	const { t } = useTranslation();

	const [supportsPWA, setSupportsPWA] = useState(false);
	const [promptInstall, setPromptInstall] = useState<any>(null);

	useEffect(() => {
		const handler = (e: any) => {
			e.preventDefault();
			setSupportsPWA(true);
			setPromptInstall(e);
		};
		window.addEventListener("beforeinstallprompt", handler);

		return () => window.removeEventListener("transitionend", handler);
	}, []);

	const onClick = (evt: any) => {
		evt.preventDefault();
		if (!promptInstall) {
			return;
		}
		promptInstall.prompt();
	};
	if (!supportsPWA) {
		return null;
	}

	// Check if already installed as PWA
	if (window.matchMedia('(display-mode: standalone)').matches) {
		return null;
	}

	return (
		<button
			className="bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold py-2 px-4 rounded mt-4"
			aria-label={t('app.pwa.install')}
			title="Install PWA"
			onClick={onClick}
		>
			{t('app.pwa.install')}
		</button>
	)
}