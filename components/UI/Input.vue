<script setup lang="ts">
const emits = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        default: null,
    },
    placeholder: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    }
});

const handleEventInput = (e: Event) :void => {
    emits('update:modelValue', (event?.target as HTMLInputElement).value)
}
</script>

<template>
    <div>
        <label
            v-if="props.label"
            class="block pl-3 ml-px text-sm font-medium text-gray-700"
            >{{ props.label }}</label
        >
        <div class="mt-1">
            <input
                :type="props.type"
                :value="props.modelValue"
                class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :placeholder="props.placeholder"
                @input="handleEventInput"
                
            />
        </div>
    </div>
</template>
