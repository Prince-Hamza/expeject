import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  ScrollView,
  Button,
} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import * as firebase from "firebase";
import "firebase/firestore";
import { getDeviceId, setStoredId } from "../util/Global";
import { serverUrl } from "../util/Global";
import DeviceIdContext from '../util/DeviceIdContext';
import HTML from "react-native-render-html";

import * as WebBrowser from 'expo-web-browser';
import { useEffect } from "react";

const privacyPolicyContent = `العربية

سياسة الخصوصية 01

آخر تحديث: 17 مارس 2022

تصف سياسة الخصوصية هذه سياساتنا وإجراءاتنا المتعلقة بجمع معلوماتك واستخدامها والكشف عنها عند استخدامك للخدمة وتخبرك بحقوق الخصوصية الخاصة بك وكيف يحميك القانون.

نستخدم بياناتك الشخصية لتوفير الخدمة وتحسينها.  باستخدام الخدمة ، فإنك توافق على جمع واستخدام المعلومات وفقًا لسياسة الخصوصية هذه.  تم إنشاء سياسة الخصوصية هذه بمساعدة نموذج سياسة الخصوصية.

التفسير والتعريفات التفسير

الكلمات التي يتم كتابة الحرف الأول بها معاني محددة وفقًا للشروط التالية.  يجب أن يكون للتعريفات التالية نفس المعنى بغض النظر عما إذا كانت تظهر بصيغة المفرد أو الجمع.

تعريفات

لأغراض سياسة الخصوصية هذه:

الحساب يعني حسابًا فريدًا تم إنشاؤه لك للوصول إلى خدمتنا أو أجزاء من خدمتنا.

الشركة التابعة تعني الكيان الذي يتحكم أو يتحكم فيه أو يخضع لسيطرة مشتركة مع أحد الأطراف ، حيث تعني "السيطرة" ملكية 50٪ أو أكثر من الأسهم أو حقوق الملكية أو الأوراق المالية الأخرى التي يحق لها التصويت لانتخاب أعضاء مجلس الإدارة أو أي سلطة إدارية أخرى  .

التطبيق يعني البرنامج الذي توفره الشركة الذي تقوم بتنزيله على أي جهاز إلكتروني يسمى 01

تشير الشركة (المشار إليها باسم "الشركة" أو "نحن" أو "نحن" في هذه الاتفاقية) إلى Call 01، Tripoli، grapa 1332.

الدولة تشير إلى: ليبيا

الجهاز يعني أي جهاز يمكنه الوصول إلى الخدمة مثل جهاز كمبيوتر أو هاتف محمول أو جهاز لوحي رقمي.

البيانات الشخصية هي أي معلومات تتعلق بفرد محدد الهوية أو يمكن التعرف عليه.

تشير الخدمة إلى التطبيق.

مقدم الخدمة يعني أي شخص طبيعي أو اعتباري يقوم بمعالجة البيانات نيابة عن الشركة.  يشير إلى شركات أو أفراد تابعين لجهات خارجية توظفهم الشركة لتسهيل الخدمة ، لتقديم الخدمة نيابة عن الشركة ، لأداء الخدمات المتعلقة بالخدمة أو لمساعدة الشركة في تحليل كيفية استخدام الخدمة.

تشير بيانات الاستخدام إلى البيانات التي يتم جمعها تلقائيًا ، إما الناتجة عن استخدام الخدمة أو من البنية التحتية للخدمة نفسها (على سبيل المثال ، مدة زيارة الصفحة).

أنت تعني الفرد الذي يصل إلى الخدمة أو يستخدمها ، أو الشركة ، أو الكيان القانوني الآخر الذي يقوم هذا الفرد بالوصول إلى الخدمة أو استخدامها نيابةً عنه ، حسب الاقتضاء.

جمع واستخدام البيانات الشخصية الخاصة بك أنواع البيانات التي يتم جمعها البيانات الشخصية

أثناء استخدام خدمتنا ، قد نطلب منك تزويدنا بمعلومات تعريف شخصية معينة يمكن استخدامها للاتصال بك أو التعرف عليك.  قد تتضمن معلومات التعريف الشخصية ، على سبيل المثال لا الحصر:

بيانات الاستخدام

يتم جمع بيانات الاستخدام تلقائيًا عند استخدام الخدمة.

قد تتضمن بيانات الاستخدام معلومات مثل عنوان بروتوكول الإنترنت الخاص بجهازك (مثل عنوان IP) ، ونوع المتصفح ، وإصدار المتصفح ، وصفحات الخدمة التي تزورها ، ووقت وتاريخ زيارتك ، والوقت الذي تقضيه على تلك الصفحات ، والجهاز الفريد  المعرفات وبيانات التشخيص الأخرى.

عندما تصل إلى الخدمة عن طريق أو من خلال جهاز محمول ، يجوز لنا جمع معلومات معينة تلقائيًا ، بما في ذلك ، على سبيل المثال لا الحصر ، نوع الجهاز المحمول الذي تستخدمه ، والمعرف الفريد لجهازك المحمول ، وعنوان IP لجهازك المحمول ، وهاتفك المحمول  نظام التشغيل ونوع مستعرض الإنترنت على الهاتف المحمول الذي تستخدمه ومعرفات الجهاز الفريدة وبيانات التشخيص الأخرى.

قد نقوم أيضًا بجمع المعلومات التي يرسلها متصفحك عندما تزور خدمتنا أو عندما تصل إلى الخدمة عن طريق أو من خلال جهاز محمول.

المعلومات التي تم جمعها أثناء استخدام التطبيق

أثناء استخدام تطبيقنا ، من أجل توفير ميزات تطبيقنا ، قد نجمع ، بإذن مسبق منك:

معلومات من دفتر هاتف جهازك (قائمة جهات الاتصال)

نستخدم هذه المعلومات لتوفير ميزات خدمتنا ، لتحسين وتخصيص خدمتنا.  قد يتم تحميل المعلومات على خوادم الشركة و / أو خادم مزود الخدمة أو قد يتم تخزينها ببساطة على جهازك.

يمكنك تمكين أو تعطيل الوصول إلى هذه المعلومات في أي وقت ، من خلال إعدادات جهازك.

استخدام بياناتك الشخصية

يجوز للشركة استخدام البيانات الشخصية للأغراض التالية:

لتوفير وصيانة خدمتنا ، بما في ذلك مراقبة استخدام خدمتنا.

لإدارة حسابك: لإدارة تسجيلك كمستخدم للخدمة.  يمكن أن تمنحك البيانات الشخصية التي تقدمها إمكانية الوصول إلى الوظائف المختلفة للخدمة المتاحة لك كمستخدم مسجل.

لتنفيذ العقد: التطوير والامتثال والتعهد بعقد الشراء للمنتجات أو الأصناف أو الخدمات التي اشتريتها أو أي عقد آخر معنا من خلال الخدمة.

للتواصل معك: للتواصل معك عن طريق البريد الإلكتروني أو المكالمات الهاتفية أو الرسائل القصيرة أو غيرها من أشكال الاتصالات الإلكترونية المماثلة ، مثل الإخطارات الفورية لتطبيقات الهاتف المحمول فيما يتعلق بالتحديثات أو الاتصالات الإعلامية المتعلقة بالوظائف أو المنتجات أو الخدمات المتعاقد عليها ، بما في ذلك التحديثات الأمنية ،  عند الضرورة أو المعقول لتنفيذها.

لتزويدك بالأخبار والعروض الخاصة والمعلومات العامة حول السلع والخدمات والأحداث الأخرى التي نقدمها والتي تشبه تلك التي اشتريتها بالفعل أو استفسرت عنها ما لم تكن قد اخترت عدم تلقي هذه المعلومات.

لإدارة طلباتك: لحضور وإدارة طلباتك إلينا.

بالنسبة لعمليات نقل الأعمال: قد نستخدم معلوماتك لتقييم أو إجراء عملية اندماج أو تصفية أو إعادة هيكلة أو إعادة تنظيم أو حل أو بيع أو نقل آخر لبعض أو كل أصولنا ، سواء كان ذلك كمنشأة مستمرة أو كجزء من الإفلاس أو التصفية ،  أو إجراء مشابه ، حيث تكون البيانات الشخصية التي نحتفظ بها حول مستخدمي خدمتنا من بين الأصول المنقولة.

لأغراض أخرى: قد نستخدم معلوماتك لأغراض أخرى ، مثل تحليل البيانات ، وتحديد اتجاهات الاستخدام ، وتحديد فعالية حملاتنا الترويجية ولتقييم وتحسين خدماتنا ومنتجاتنا وخدماتنا وتسويقنا وتجربتك.

قد نشارك معلوماتك الشخصية في المواقف التالية:

مع مزودي الخدمة: قد نشارك معلوماتك الشخصية مع مزودي الخدمة لمراقبة وتحليل استخدام خدمتنا ، للاتصال بك.  أو بيع أصول الشركة أو التمويل أو الاستحواذ على كل أو جزء من أعمالنا إلى شركة أخرى. مع الشركات التابعة: قد نشارك معلوماتك مع الشركات التابعة لنا ، وفي هذه الحالة سنطلب من تلك الشركات التابعة احترام سياسة الخصوصية هذه.  تشمل الشركات التابعة شركتنا الأم وأي شركات فرعية أخرى أو شركاء في المشاريع المشتركة أو شركات أخرى نسيطر عليها أو تخضع لسيطرة مشتركة معنا. مع شركاء الأعمال: قد نشارك معلوماتك مع شركائنا في العمل لنقدم لك بعض المنتجات أو الخدمات أو العروض الترويجية  مع مستخدمين آخرين: عندما تشارك معلومات شخصية أو تتفاعل بطريقة أخرى في الأماكن العامة مع مستخدمين آخرين ، قد يتم عرض هذه المعلومات من قبل جميع المستخدمين ويمكن توزيعها علنًا في الخارج. بموافقتك: يجوز لنا الكشف عن معلوماتك الشخصية لأي غرض آخر  بموافقتك الاحتفاظ ببياناتك الشخصية

ستحتفظ الشركة ببياناتك الشخصية فقط طالما كان ذلك ضروريًا للأغراض المنصوص عليها في سياسة الخصوصية هذه.  سنحتفظ ببياناتك الشخصية ونستخدمها بالقدر اللازم للامتثال لالتزاماتنا القانونية (على سبيل المثال ، إذا كنا مطالبين بالاحتفاظ ببياناتك للامتثال للقوانين المعمول بها) ، وحل النزاعات ، وفرض اتفاقياتنا وسياساتنا القانونية.

ستحتفظ الشركة أيضًا ببيانات الاستخدام لأغراض التحليل الداخلي.  يتم الاحتفاظ ببيانات الاستخدام بشكل عام لفترة زمنية أقصر ، إلا في حالة استخدام هذه البيانات لتعزيز الأمن أو لتحسين وظائف خدمتنا ، أو نحن ملزمون قانونًا بالاحتفاظ بهذه البيانات لفترات زمنية أطول.

نقل بياناتك الشخصية

تتم معالجة معلوماتك ، بما في ذلك البيانات الشخصية ، في مكاتب تشغيل الشركة وفي أي أماكن أخرى حيث توجد الأطراف المشاركة في المعالجة.  هذا يعني أنه قد يتم نقل هذه المعلومات إلى - والاحتفاظ بها - على أجهزة الكمبيوتر الموجودة خارج ولايتك أو مقاطعتك أو بلدك أو أي ولاية قضائية حكومية أخرى حيث قد تختلف قوانين حماية البيانات عن تلك الموجودة في ولايتك القضائية.

موافقتك على سياسة الخصوصية هذه متبوعة بتقديمك لهذه المعلومات يمثل موافقتك على هذا النقل.

ستتخذ الشركة جميع الخطوات اللازمة بشكل معقول لضمان التعامل مع بياناتك بشكل آمن ووفقًا لسياسة الخصوصية هذه ولن يتم نقل بياناتك الشخصية إلى منظمة أو دولة ما لم تكن هناك ضوابط كافية في مكانها بما في ذلك أمن  بياناتك ومعلوماتك الشخصية الأخرى.

الكشف عن البيانات الشخصية الخاصة بك المعاملات التجارية

إذا كانت الشركة متورطة في عملية دمج أو استحواذ أو بيع أصول ، فقد يتم نقل بياناتك الشخصية.  سنقدم إشعارًا قبل نقل بياناتك الشخصية وإخضاعها لسياسة خصوصية مختلفة.

تطبيق القانون

في ظل ظروف معينة ، قد يُطلب من الشركة الكشف عن بياناتك الشخصية إذا طُلب منها ذلك بموجب القانون أو استجابة لطلبات صحيحة من قبل السلطات العامة (على سبيل المثال ، محكمة أو وكالة حكومية).

المتطلبات القانونية الأخرى

قد تفصح الشركة عن بياناتك الشخصية بحسن نية أن هذا الإجراء ضروري من أجل:

الامتثال لالتزام قانوني حماية والدفاع عن حقوق أو ممتلكات الشركة منع أو التحقيق في أي مخالفات محتملة تتعلق بالخدمة حماية السلامة الشخصية لمستخدمي الخدمة أو الجمهور الحماية من المسؤولية القانونيةأمن بياناتك الشخصية

يعد أمان بياناتك الشخصية أمرًا مهمًا بالنسبة لنا ، ولكن تذكر أنه لا توجد طريقة نقل عبر الإنترنت أو طريقة تخزين إلكتروني آمنة بنسبة 100٪.  بينما نسعى جاهدين لاستخدام وسائل مقبولة تجاريًا لحماية بياناتك الشخصية ، لا يمكننا ضمان أمنها المطلق.

خصوصية الأطفال

لا تخاطب خدمتنا أي شخص يقل عمره عن 13 عامًا. نحن لا نجمع عن قصد معلومات تعريف شخصية من أي شخص يقل عمره عن 13 عامًا. إذا كنت أحد الوالدين أو الوصي وتدرك أن طفلك قد زودنا ببيانات شخصية ، من فضلك  اتصل بنا.  إذا علمنا أننا جمعنا بيانات شخصية من أي شخص يقل عمره عن 13 عامًا دون التحقق من موافقة الوالدين ، فإننا نتخذ خطوات لإزالة هذه المعلومات من خوادمنا.

إذا احتجنا إلى الاعتماد على الموافقة كأساس قانوني لمعالجة معلوماتك وطلب بلدك موافقة أحد الوالدين ، فقد نطلب موافقة والديك قبل أن نجمع هذه المعلومات ونستخدمها.

روابط لمواقع أخرى

قد تحتوي خدمتنا على روابط لمواقع أخرى لا نقوم بتشغيلها.  إذا قمت بالنقر فوق ارتباط جهة خارجية ، فسيتم توجيهك إلى موقع هذا الطرف الثالث.  ننصحك بشدة بمراجعة سياسة الخصوصية لكل موقع تزوره.

ليس لدينا أي سيطرة ولا نتحمل أي مسؤولية عن المحتوى أو سياسات الخصوصية أو الممارسات الخاصة بأي مواقع أو خدمات خاصة بطرف ثالث.

التغييرات على سياسة الخصوصية هذه

قد نقوم بتحديث سياسة الخصوصية الخاصة بنا من وقت لآخر.  سنخطرك بأي تغييرات عن طريق نشر سياسة الخصوصية الجديدة على هذه الصفحة.

سنخبرك عبر البريد الإلكتروني و / أو إشعارًا بارزًا على خدمتنا ، قبل أن يصبح التغيير ساريًا وتحديث تاريخ "آخر تحديث" في الجزء العلوي من سياسة الخصوصية هذه.

يُنصح بمراجعة سياسة الخصوصية هذه بشكل دوري لمعرفة أي تغييرات.  تسري التغييرات التي تطرأ على سياسة الخصوصية هذه عند نشرها على هذه الصفحة.


حذف بيانات المستخدم
 عند الضغط على زر حذف البيانات ، نعدك بحذف جميع المعلومات التي تم جمعها من هاتفك وبالمعلومات التي نعني بها جهات الاتصال.

ملاحظة=عند تحميلك للتطبيق يطلب منك اذن الوصول الي جهات الاتصال اذا كنت لاتوافق علي استخدام جهات اتصالك في التطبيق لايسمح لك باستخدام التطبيق وشكرا

اتصل بنا

إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه ، يمكنك الاتصال بنا:

عن طريق البريد الإلكتروني: nijokdu@gmail.com

البنود و الظروف
By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages or make derivative versions. The app itself, and all the trademarks, copyright, database rights, and other intellectual property rights related to it, still belong to [Developer/Company name].

[Developer/Company name] is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.

The 01 app stores and processes personal data that you have provided to us, to provide [my/our] Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the 01 app won’t work properly or at all.

The app does use third-party services that declare their Terms and Conditions.

Link to Terms and Conditions of third-party service providers used by the app

Google Play Services
AdMob
Firebase Crashlytics
You should be aware that there are certain things that [Developer/Company name] will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi or provided by your mobile network provider, but [Developer/Company name] cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.

If you’re using the app outside of an area with Wi-Fi, you should remember that the terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third-party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.

Along the same lines, [Developer/Company name] cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, [Developer/Company name] cannot accept responsibility.

With respect to [Developer/Company name]’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavor to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. [Developer/Company name] accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.

At some point, we may wish to update the app. The app is currently available on ذكري المظهر – the requirements for the system(and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. [Developer/Company name] does not promise that it will always update the app so that it is relevant to you and/or works with the ذكري المظهر version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.

Changes to This Terms and Conditions

[I/We] may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. [I/We] will notify you of any changes by posting the new Terms and Conditions on this page.

These terms and conditions are effective as of 2022-03-10

Contact Us

If you have any questions or suggestions about [my/our] Terms and Conditions, do not hesitate to contact [me/us] at nijokdu@gmail.com.

This Terms and Conditions page was generated by App Privacy Policy Generator
`;




function Welcome(props) {
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const appProps = React.useContext(DeviceIdContext);
  let scrollRef = React.useRef();
  function _handlePress(cond, pri) {
    if (cond && pri) {
      _loginHandler();
    }
    else {
      setShowModal(false);
    }
  }
  function _loginHandler() {
    setLoading(true);

    ///EDIT//
    (async function () {
      //Bunch of code...
      const deviceId = await getDeviceId();
      await setStoredId(deviceId);
      appProps.setUser(deviceId);
      console.log(deviceId);
      setLoading(false);
    })();

    // Check if user exists in database

    // and increase the count in dashboard table
    let clicks = 0;
    let wait_for_close = 0;
    let total_users = 0;
    let total_contacts = 0;
    fetch(serverUrl + '/api/dashboard/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.length !== 0) {
          clicks = json[0].ads_click;
          wait_for_close = json[0].ads_wait;
          total_users = json[0].total_users;
          total_contacts = json[0].total_contacts;
        }


      })
      .then(() => {
        fetch(serverUrl + '/api/dashboard/updateStats', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            stats: {

              total_users: total_users + 1
            }

          })
        })


      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setLoading(false);

      })


    // firebase
    //   .auth()
    //   .signInAnonymously()
    //   .then(() => {
    //     let total_users = 0;
    //     firebase
    //       .firestore()
    //       .collection("dashboard")
    //       .get()
    //       .then((res) => {
    //         if (!res.empty) {
    //           total_users = res.docs[0].data().total_users;
    //         } else {
    //           firebase
    //             .firestore()
    //             .collection("dashboard")
    //             .doc("admin-access")
    //             .set({
    //               ads_click: 0,
    //               ads_wait: 0,
    //               total_contacts: 0,
    //               total_users: 0,
    //             });
    //         }
    //         firebase
    //           .firestore()
    //           .collection("dashboard")
    //           .doc("admin-access")
    //           .update({
    //             total_users: total_users + 1,
    //           });
    //       });
    //   })
    //   .catch(function (error) {
    //     console.log(error);

    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...



    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const contentWidth = screenWidth * 0.9;

  const CheckPrivacy = (props) => {
    const [conditionsChecked, setConditionsChecked] = React.useState(false);
    const [privacyChecked, setPrivacyChecked] = React.useState(false);

    useEffect(() => {
      if (privacyChecked) {

        scrollRef.scrollTo({
          x: 0,
          y: 5500,
          duration: 0,
          animated: false
        });
      }
    }, [privacyChecked])

    useEffect(() => {
      if (conditionsChecked) {

        scrollRef.scrollToEnd({

          animated: false
        });
      }
    }, [conditionsChecked])
    return (
      <View style={{
        borderRadius: 10, backgroundColor: "#edf3f7", width: '100%', padding: 20, margin: 10,
        elevation: 6
      }} >
        <View style={{ flexDirection: 'row', paddingVertical: 10, backgroundColor: 'transparent' }}>
          <CheckBox
            disabled={false}
            tintColors={{ true: "black", false: "black" }}
            value={privacyChecked}
            onValueChange={(newValue) => {
              setPrivacyChecked(newValue);


            }}
          />
          <Text style={{ fontFamily: 'BurbankBigCondensedBlack' }}> اوافق على</Text>
          <TouchableOpacity
            onPress={() => WebBrowser.openBrowserAsync('https://pages.flycricket.io/01-0/privacy.html')}>

            <Text style={{ fontFamily: 'BurbankBigCondensedBlack', fontStyle: 'italic', fontWeight: 'bold', borderBottomWidth: 1 }}> سياسة الخصوصية</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', paddingVertical: 10, backgroundColor: 'transparent' }}>
          <CheckBox
            disabled={false}
            tintColors={{ true: "black", false: "black" }}
            value={conditionsChecked}
            onValueChange={(newValue) => setConditionsChecked(newValue)}
          />
          <Text style={{ fontFamily: 'BurbankBigCondensedBlack' }}> اوافق على</Text>
          <TouchableOpacity
            onPress={() => WebBrowser.openBrowserAsync('https://pages.flycricket.io/01-0/terms.html')}>

            <Text style={{ fontFamily: 'BurbankBigCondensedBlack', fontStyle: 'italic', fontWeight: 'bold', borderBottomWidth: 1 }}> الشروط والاحكام </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btn}
          onPress={() => props.handlePress(conditionsChecked, privacyChecked)} >
          {(conditionsChecked && privacyChecked) ?
            <Text style={styles.btnText}>متابعة</Text> :
            <Text style={styles.btnText}>الخروج</Text>}
        </TouchableOpacity>

      </View>
    )
  }
  const AcceptionModal = () => {
    return (
      <View
      // animationType='none'
      // transparent={true}
      // visible={true}
      >
        <View style={{
          flex: 1,
          marginTop: 1,
          marginLeft: 1,
          marginRight: 1,
          backgroundColor: "white",
          borderRadius: 20,
          paddingLeft: 35,
          paddingRight: 35,
          paddingTop: 35,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        }}>

          <ScrollView style={{ flex: 1, flexDirection: 'column' }} ref={(ref) => scrollRef = ref}>
            <HTML
              source={{ html: privacyPolicyContent }}
              contentWidth={contentWidth}

            />
          </ScrollView>
          <CheckPrivacy handlePress={_handlePress} />


        </View>
      </View>
    )
  }

  return (
    <>
      <View style={styles.container}>
        {showModal ? <AcceptionModal /> : null
        }
        <View style={styles.imgContainer}>
          <Image
            source={require("../../assets/callerAppLogo.png")}
            style={styles.img}
            resizeMode="cover"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.logo}>
            0 <Text style={{ color: "gray" }}>1</Text>
          </Text>
          <Text style={styles.hint}>كاشف الأرقام والبحث بالاسم</Text>
          <TouchableOpacity
            style={styles.btn}
            //onPress={_loginHandler}
            onPress={() => setShowModal(true)}
            disabled={loading}
          >
            <Text style={styles.btnText}>ابدأ الآن</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: height * 0.04,
    marginTop: 0,
    alignItems: "center",
    backgroundColor: "#edf3f7",
  },
  imgContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#edf3f7",
  },
  img: {
    height: width * 0.3,
    width: width * 0.3,
    borderRadius: 5,
  },
  logo: {
    marginTop: height * 0.05,

    fontFamily: "BurbankBigCondensedBlack",
    fontSize: 40,
    textAlign: "center",
  },
  btn: {
    paddingHorizontal: 10,
    marginTop: "auto",
    marginBottom: "auto",
    borderRadius: 5,
    paddingVertical: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnText: {
    fontFamily: 'BurbankBigCondensedBlack',
    textAlign: "center",
    letterSpacing: 2,
  },
  hint: {
    fontFamily: "BurbankBigCondensedBlack",
    textAlign: "center",
    color: "#92bad4",
  },
});
export default Welcome;
