<script setup lang="ts">
const data = reactive({
    password: "",
    username: "",
    loading: false,
});

const { login } = useAuth();
const handleLogin = async () => {
    data.loading = true;
    try {
        await login({
            username: data.username,
            password: data.password
        })
    } catch (error) {
        console.log(error);
        
    } finally {
        data.loading = false;
    }
};
</script>

<template>
    <div>
        <div class="pt-5 space-y-4">
            <UIInput
                v-model="data.username"
                label="Username"
                placeholder="@username"
            />
            <UIInput
                v-model="data.password"
                label="Password"
                placeholder="*******"
                type="password"
            />
            <div>
                <button @click="handleLogin">Submit</button>
            </div>
        </div>
    </div>
</template>
