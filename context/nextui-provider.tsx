'use client';

import { NextUIProvider } from '@nextui-org/react';

export default function NextProvider({
	children
}: {
	children: React.ReactNode;
}): React.ReactNode {
	return <NextUIProvider>{children}</NextUIProvider>;
}
