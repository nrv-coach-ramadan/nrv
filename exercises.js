// Sample catalog of common exercises (bounded list, names only, no media). t: w=weights/machines, c=cardio
const EXM={chest:['صدر','Chest'],back:['ظهر','Back'],shoulders:['أكتاف','Shoulders'],biceps:['باي','Biceps'],triceps:['تراي','Triceps'],legs:['أرجل','Legs'],glutes:['مؤخرة','Glutes'],core:['بطن','Core'],calves:['سمانة','Calves'],full:['جسم كامل','Full body']};
const EXQ={barbell:['بار','Barbell'],dumbbell:['دمبل','Dumbbell'],machine:['جهاز','Machine'],cable:['كابل','Cable'],body:['وزن الجسم','Bodyweight'],kettlebell:['كيتل بيل','Kettlebell'],band:['استك','Band'],treadmill:['مشاية','Treadmill'],bike:['عجلة','Bike'],elliptical:['إليبتكال','Elliptical'],rower:['جهاز تجديف','Rower'],stair:['سلم كهربي','Stair climber'],rope:['حبل','Jump rope'],outdoor:['خارجي','Outdoor']};
const EXR=`w|chest|barbell|بنش بريس بار|Barbell bench press
w|chest|barbell|بنش بريس مائل بار|Incline barbell bench press
w|chest|dumbbell|بنش بريس دمبل|Dumbbell bench press
w|chest|dumbbell|بنش مائل دمبل|Incline dumbbell press
w|chest|dumbbell|فلاي دمبل|Dumbbell fly
w|chest|machine|ضغط صدر جهاز|Chest press machine
w|chest|machine|بيك دك (فلاي جهاز)|Pec deck fly
w|chest|cable|كروس أوفر كابل|Cable crossover
w|chest|body|ضغط (بوش أب)|Push-up
w|chest|body|متوازي للصدر (ديبس)|Chest dips
w|back|barbell|ديدلفت|Deadlift
w|back|barbell|تجديف بار|Barbell row
w|back|dumbbell|تجديف دمبل بذراع واحدة|One-arm dumbbell row
w|back|machine|سحب أمامي واسع (لات بول داون)|Lat pulldown
w|back|machine|تجديف جالس جهاز|Seated row machine
w|back|cable|تجديف كابل جالس|Seated cable row
w|back|cable|سحب ذراع مفرودة|Straight-arm pulldown
w|back|body|بول أب (عقلة)|Pull-up
w|back|body|تشين أب|Chin-up
w|back|machine|ظهر سفلي جهاز (هايبر إكستنشن)|Back extension
w|shoulders|barbell|ضغط أكتاف بار|Barbell overhead press
w|shoulders|dumbbell|ضغط أكتاف دمبل|Dumbbell shoulder press
w|shoulders|dumbbell|رفرفة جانبي دمبل|Dumbbell lateral raise
w|shoulders|dumbbell|رفرفة أمامي دمبل|Dumbbell front raise
w|shoulders|dumbbell|رفرفة خلفي دمبل|Rear delt fly
w|shoulders|machine|ضغط أكتاف جهاز|Shoulder press machine
w|shoulders|machine|رفرفة خلفي جهاز|Reverse pec deck
w|shoulders|cable|رفرفة جانبي كابل|Cable lateral raise
w|shoulders|barbell|شرق بار (شراجز)|Barbell shrug
w|shoulders|cable|فيس بول|Face pull
w|biceps|barbell|باي بار|Barbell curl
w|biceps|dumbbell|باي دمبل|Dumbbell curl
w|biceps|dumbbell|هامر كيرل|Hammer curl
w|biceps|machine|بريتشر كيرل جهاز|Preacher curl machine
w|biceps|cable|باي كابل|Cable curl
w|biceps|dumbbell|كونسنتريشن كيرل|Concentration curl
w|triceps|cable|تراي بوش داون كابل|Triceps pushdown
w|triceps|barbell|سكل كراشر|Skull crusher
w|triceps|dumbbell|تراي خلف الرأس دمبل|Overhead dumbbell extension
w|triceps|machine|ضغط تراي جهاز|Triceps press machine
w|triceps|body|متوازي للتراي (ديبس)|Triceps dips
w|triceps|barbell|بنش ضيق|Close-grip bench press
w|legs|barbell|سكوات بار|Barbell squat
w|legs|barbell|فرونت سكوات|Front squat
w|legs|dumbbell|جوبلت سكوات|Goblet squat
w|legs|machine|ليج بريس|Leg press
w|legs|machine|هاك سكوات جهاز|Hack squat machine
w|legs|machine|رفرفة رجل أمامي (ليج إكستنشن)|Leg extension
w|legs|machine|رجل خلفي (ليج كيرل)|Leg curl
w|legs|dumbbell|لانجز دمبل|Dumbbell lunges
w|legs|dumbbell|بلغاري سبليت سكوات|Bulgarian split squat
w|legs|barbell|رومانيان ديدلفت|Romanian deadlift
w|legs|machine|سميث ماشين سكوات|Smith machine squat
w|legs|machine|فخذ داخلي جهاز (أدكتور)|Hip adductor machine
w|legs|machine|فخذ خارجي جهاز (أبدكتور)|Hip abductor machine
w|glutes|barbell|هيب ثراست بار|Barbell hip thrust
w|glutes|machine|كيك باك كابل/جهاز|Glute kickback
w|glutes|body|جلوت بريدج|Glute bridge
w|glutes|dumbbell|ستيب أب دمبل|Dumbbell step-up
w|calves|machine|سمانة واقف جهاز|Standing calf raise
w|calves|machine|سمانة جالس جهاز|Seated calf raise
w|calves|body|سمانة وزن الجسم|Bodyweight calf raise
w|core|body|بلانك|Plank
w|core|body|كرانش|Crunch
w|core|body|رفع أرجل معلق|Hanging leg raise
w|core|body|روسيان تويست|Russian twist
w|core|cable|كرانش كابل|Cable crunch
w|core|machine|كرانش جهاز|Ab crunch machine
w|core|body|ماونتن كلايمبر|Mountain climber
w|core|body|سايد بلانك|Side plank
w|full|kettlebell|كيتل بيل سوينج|Kettlebell swing
w|full|barbell|باور كلين|Power clean
w|full|body|بيربي|Burpee
w|full|band|سحب استك|Band pull-apart
c|full|treadmill|مشي على المشاية|Treadmill walk
c|full|treadmill|جري على المشاية|Treadmill run
c|full|treadmill|مشاية بميل (إنكلاين)|Incline treadmill walk
c|full|bike|عجلة ثابتة|Stationary bike
c|full|bike|عجلة سبينينج|Spin bike
c|full|elliptical|إليبتكال|Elliptical trainer
c|full|rower|جهاز تجديف|Rowing machine
c|full|stair|سلم كهربي (ستير ماستر)|Stair climber
c|full|rope|نط الحبل|Jump rope
c|full|outdoor|مشي في الخارج|Outdoor walk
c|full|outdoor|جري في الخارج|Outdoor run
c|full|outdoor|عجلة في الخارج|Outdoor cycling
c|full|outdoor|سباحة|Swimming
c|full|body|جامبنج جاكس|Jumping jacks
c|full|body|هاي نيز (ركب عالية)|High knees
c|full|body|إنتروال HIIT|HIIT intervals
c|full|machine|إير بايك|Air bike
c|full|machine|سكي إيرج|Ski erg`;
const EXC=EXR.split('\n').map((l,i)=>{const[a,b,c,d,e]=l.split('|');return{id:'x'+i,t:a,m:b,q:c,ar:d,en:e}});
