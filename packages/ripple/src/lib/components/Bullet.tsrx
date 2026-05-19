import { track } from 'ripple';
import { ctx } from '../context.js';
import { flash } from '../util/flash.js';

export component Bullet(&{ value }: { value?: any }) {
  const ctxVal = ctx.get();
  let &[flashing] = track(false);

  function flashBullet(): void {
    if (flashing) return;
    flashing = true;
    window.setTimeout(() => {
      flashing = false;
    }, 250);
  }

  <div class="bullet" role="presentation">
    <div
      aria-hidden
      class={['dash', flashing && 'flashing']}
      {ref flash(() => value, flashBullet, true)}
    />
  </div>

  <style>
    .bullet {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      align-items: center;
      aspect-ratio: 1 / 1;
      width: 1em;
      min-width: 1em;
      max-width: 1em;
      height: 1em;
      user-select: none;

      .dash {
        transition-duration: var(--__transition-duration);
        transition-property: width, height, border-radius, background-color, transform;
        transition-timing-function: var(--_back-out);
        border-radius: 0px;
        background-color: var(--_bullet-color);
        width: 4px;
        height: 1px;
        overflow: visible;

        &.flashing {
          transform: translateX(1%) scale(1, 1) rotate(-10deg);
          filter: drop-shadow(0px 0px 2px var(--_update-flash-color));
          border-radius: 9999px;
          background-color: var(--_update-flash-color);
          width: 4px;
          height: 4px;
        }

        &.flashing.noanimate {
          transform: translateX(1%) scale(1, 1) rotate(2turn);
          filter: drop-shadow(0px 0px 2px var(--_update-flash-color));
          border: 1px solid var(--_update-flash-color);
          background-color: var(--_update-flash-color) !important;
          width: 4px !important;
          height: 4px !important;
        }
      }
    }
  </style>
}
