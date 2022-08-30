# Running
front:
	cd frontend && pnpm run start
back:
	cd backend && pnpm ts-node index.ts host=127.0.0.1 port=8100

