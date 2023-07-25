import { useRouter } from 'vue-router'

export function getRouteName() {
    const router = useRouter();
    return router.currentRoute.value.name;
}