# stone-digital
Wp Stone Digital Theme 


#  class use for section - common typo

** group -- block shouldbe section tag

### section-header - `section-header`
   - `stdl-title`
   - `stdl-description`
   - `block_ele_space (20px)`

### section background 
   + `stdl-bg-dark` (dark)
   + `stdl-bg-light-dark` (light dark)
   + `stdl-bg-light` (light dark)


### section common space ( top/bottom -padding )
  - `section-space`
  - `section-pg-banner-space`

### section btn ---- stdl-section-btn
  - `btn-primary`
  - `btn-primary-tp`
  - `btn-secondary`
  - `btn-link`

### for svg icon ---- use this function
   - `stdl_get_svg()`



### Section background color 

  - ` bg-dark `,
  - ` stdl-bg-dark `- use  - background-color: var(--color-black)

  - ` bg-light-dark `,
  - ` stdl-bg-light-dark ` - use -background-color: var(--color-dark);

  - ` bg-light `,
  - ` stdl-bg-light ` - use - background-color: var(--color-white);

  - ` bg-grad `,
  - ` stdl-bg-gradient ` - use - background: transparent linear-gradient(0deg, var(--color-black) 0%, var(--color-dark) 100%);

  - ` stdl-bg-gradient_half ` - use -background: linear-gradient(180deg, var(--color-black) 50%, var(--color-dark) 50%);

  - ` bg-dark-gray `,
  - ` stdl-bg-dark-gray ` -use -background: var(--color-dark-gray);


### Section background space  `**Class - Name**`

  - ` sp-80 `
  - ` section-space ` - use -padding: 80px 0;

  - ` sp-t-80 `
  - ` section-space_top ` - use - padding: 80px 0 0;

  - ` sp-b-80 `
  - ` section-space_bottom ` - use - padding: 0px 0 80px;

  - ` sp-40 `
  - ` section-space_40 ` - padding: 40px 0;

  - ` sp-t-40 `
  - ` section-space_top-40 ` - use - padding: 40px 0 0;

  - ` sp-b-40 `
  - ` section-space_bottom-40 ` - use - padding: 0px 0 80px;

### Standard Group Style

**if you set container - width just select section from right sidebar**

- ` stdl-standard_1 ` (default column gap is 80px) and for Backgorund color ` .bg-dark ` ` .bg-light-dark ` ` .bg-light ` ` .bg-grad ` ` .bg-dark-gray `
 **  Title, text, List and image have style **

### Bg img set - Group Style
 - ` bg-img-shape ` - use - class at group and image block -  ` img-as-bg `
 
 ### Unset Image Border Radius - Group Style
 - ` stdl-br-0 ` - use - class at group and image block 
 
### Unset Image Border Radius zero - Globally in Wp Block Image
 - ` br-0 ` - use - class for unset border radius to the image block 
 - ` stdl-br-0 ` - use - class for unset border radius to the image block 
 
 ### Unset Image Border Radius - Globally in Wp Block Image
 - ` br-10 ` - use - class for border radius `10px` to the image block 
 - ` stdl-br-10 ` - use - class for border radius `10px` to the image block 

 ### Use only for small space cases - Group Style
 - ` mb-0 `  - use - class at group and (text, image, heading) block (margin-bottom: 0px)
 - ` mb-10 ` - use - class at group and (text, image, heading) block (margin-bottom: 10px)
 - ` mb-20 ` - use - class at group and (text, image, heading) block (margin-bottom: 20px)

 - ` pt-0 `  - use - class at group and (text, image, heading) block (padding-top: 0px)
 - ` pt-10 ` - use - class at group and (text, image, heading) block (padding-top: 10px)
 - ` pb-20 ` - use - class at group and (text, image, heading) block (padding-top: 10px) 
 
 - ` pb-0 `  - use - class at group and (text, image, heading) block (padding-bottom: 0px)
 - ` pb-10 ` - use - class at group and (text, image, heading) block (padding-bottom: 10px)
 - ` pb-15 ` - use - class at group and (text, image, heading) block (padding-bottom: 15px)
 - ` pb-20 ` - use - class at group and (text, image, heading) block (padding-bottom: 20px)

 - ` pl-15 ` - use - class at group and (text, image, heading) block (padding-left: 15px)
 - ` pl-20 ` - use - class at group and (text, image, heading) block (padding-left: 20px)
 - ` pr-15 ` - use - class at group and (text, image, heading) block (padding-right: 15px)
 - ` pr-20 ` - use - class at group and (text, image, heading) block (padding-right: 20px)