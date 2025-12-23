<template>
  <div @click="$emit('click', book)"
    class="bg-white rounded-lg overflow-hidden cursor-pointer border border-[#E0E0E0] relative

           shadow-[0_4px_12px_rgba(0,0,0,0.05)]
           
           transition-all duration-[1000ms] cubic-bezier(0.175, 0.885, 0.32, 1.1)
           will-change-transform
           hover:-translate-y-4

           hover:shadow-[0_40px_60px_-15px_rgba(0,0,0,0.12),0_20px_20px_-10px_rgba(0,0,0,0.08)]
           hover:border-[#f4f2e5]
           hover:z-50">
    
    <div class="aspect-[3/4] bg-[#f4f2e5] relative overflow-hidden">
      <img :src="book.cover" :alt="book.title" v-if="book.cover" 
           class="w-full h-full object-cover transition-transform duration-[1200ms] ease-out" />
      <div v-else class="w-full h-full"></div>
    </div>

    <div class="p-3">
      <h3 class="text-[#333333] mb-1 line-clamp-2" style="font-size: 0.875rem">
        {{ book.title }}
      </h3>
      <p class="text-[#666666] mb-2" style="font-size: 0.75rem">
        {{ book.author }}
      </p>
      <div class="flex items-center justify-between">
        <StarRating :rating="book.rating" :size="14" />
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="text-[#666666]">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
          <span class="text-[#666666]" style="font-size: 0.75rem">
            {{ book.commentCount }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import StarRating from './StarRating.vue';

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
});

defineEmits(['click']);
const computedRating = computed(() => {
    const userRating = props.book.rating; 
    
    if (userRating != null) {
        return userRating;
    }
    return 0;
});

const computedCommentCount = computed(() => {
  return props.book.comment_count || (props.book.comments ? props.book.comments.length : 0);
});
</script>