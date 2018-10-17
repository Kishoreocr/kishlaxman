import { trigger, state, style, transition,
    animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
    trigger('slideInOut', [
        state('in', style({
            'right':  '-300px',
        })),
        state('out', style({
             'right': '0px',
        })),
        transition('in => out', [group([
            animate('400ms ease-in-out', style({
                'right': '-300px'
            })),
            animate('500ms ease-in-out', style({
                'right': '0px',
            })),
        ]
        )])
  
    
    ]),
    trigger('slideOutIn', [
        state('in', style({
            'right':  '0px',
        })),
        state('out', style({
             'right': '-300px',
        })),
        transition('in => out', [group([
            animate('400ms ease-in-out', style({
                'right': '0px'
            })),
            animate('600ms ease-in-out', style({
                'right': '-300px'
                
            })),
        ]
        )])
  
    
    ]),
]