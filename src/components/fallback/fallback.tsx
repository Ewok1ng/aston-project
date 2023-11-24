import React from 'react';

import type { FallbackProps } from 'react-error-boundary';

export function Fallback({ error }: FallbackProps) {
	return (
		<div>
			<p>Something went wrong:</p>
			<pre style={{ color: 'red' }}>{error.message}</pre>
		</div>
	);
}
