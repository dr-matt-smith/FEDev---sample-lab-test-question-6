export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        let n = data.get('n');

        cookies.set('number', n, { path: '/' });

        return {
            n
        };
    }
};