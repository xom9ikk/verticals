import { ResizeDirectionGroup } from '@use/resizable/types';

const isTouchEvent = (event: Event): event is TouchEvent => event.type.includes('touch');

export const getPositionFromMouseOrTouch = (
  direction: ResizeDirectionGroup,
  event: MouseEvent | TouchEvent,
) => {
  if (isTouchEvent(event)) {
    return direction === 'vertical' ? event.touches[0].screenY : event.touches[0].screenX;
  }
  return direction === 'vertical' ? event.screenY : event.screenX;
};
