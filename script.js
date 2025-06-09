// Tập hợp love được chạm
const loveTaps = new Set();
let userName = "";

function startApp() {
  const stageIds = ["cardStage", "startStage", "inputStage", "loveStage"];
  const stages = Object.fromEntries(
    stageIds.map((id) => [id, document.getElementById(id)])
  );

  if (Object.values(stages).some((stage) => !stage)) {
    console.error("Thiếu một trong các element stage!");
    return;
  }

  stages.startStage.style.display = "none";
  stages.inputStage.style.display = "block";
  stages.loveStage.style.display = "none";
  stages.cardStage.style.display = "none";

  document
    .getElementById("bgMusic")
    ?.play()
    .catch((err) => console.warn("Không thể phát nhạc:", err));

  inipesan();
}

typeWriterEffect = (text, elementId, callback) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Không tìm thấy element với ID: ${elementId}`);
    return;
  }

  let i = 0;
  const speed = 50;
  element.textContent = "";

  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      console.log("Hiệu ứng gõ hoàn tất");
      callback?.();
    }
  };

  type();
};

function switchStage(fromId, toId, withFade = false) {
  const fromElement = document.getElementById(fromId);
  const toElement = document.getElementById(toId);

  if (!fromElement || !toElement) {
    console.error(`Không tìm thấy element: ${fromId} hoặc ${toId}`);
    return;
  }

  if (withFade) {
    fromElement.classList.add("hidden");
    setTimeout(() => {
      fromElement.style.display = "none";
      toElement.style.display = "block";
    }, 1000);
  } else {
    fromElement.style.display = "none";
    toElement.style.display = "block";
  }
}
const loveText = "LOVE";
function tapLove(id) {
  if (loveTaps.has(id)) return;

  const loveIcon = document.querySelector(
    `#loveIcons .love-icon:nth-child(${id}) .love-letter`
  );
  loveIcon.classList.add("tapped");
  loveIcon.textContent = loveText[id - 1];
  loveTaps.add(id);
  console.log(`Chạm love ${id}, tổng: ${loveTaps.size}`);

  if (loveTaps.size === 4) {
    Swal.fire({
      title: "Đủ 4 love rồi nè!",
      text: "Sẵn sàng nhận quà chưa? 💖",
      timer: 1500,
      showConfirmButton: false,
      background: "#fffbe7",
      customClass: { title: "swal-title", content: "swal-text" },
    }).then(() => {
      switchStage("loveStage", "cardStage", true);

      const loveMsg = document.getElementById("loveMsg");
      if (!loveMsg) return console.error("Không tìm thấy element loveMsg!");

      typeWriterEffect(
        `Chúc ${userName} bé nhỏ của anh lúc nào cũng vui tươi như một em bé, nhưng luôn được anh nâng niu như một nữ hoàng xinh đẹp 👑. Dù em có lớn đến đâu, thì trong mắt anh, em mãi là công chúa bé bỏng, đáng yêu vô đối, phải được ôm hôn, cưng nựng và chiều chuộng mỗi ngày cho đủ tiêu chuẩn cute 🥺💘. Anh iu em nhấc cả vũ trụ luôn á 💫

Người yêu anh là món quà quý giá nhất mà cuộc sống đã ban tặng 💝. Em không chỉ xinh đẹp với nụ cười rạng rỡ 😊 mà còn có một trái tim dịu dàng, luôn biết yêu thương và bao dung 💖. Mỗi ngày bên em, anh cảm thấy thế giới trở nên nhẹ nhàng và tươi sáng hơn 🌞. Em như ánh nắng sớm mai, ấm áp len vào từng ngóc ngách của tâm hồn anh.

Có những lúc anh mệt mỏi, chỉ cần nghe giọng nói của em cũng đủ khiến anh thấy bình yên 😌. Em không cần làm điều gì to tát, chỉ cần ở cạnh anh, cùng anh chia sẻ những niềm vui nhỏ bé và cả những nỗi buồn vu vơ 🌈. Chính sự quan tâm lặng lẽ và chân thành ấy khiến anh càng thêm yêu em nhiều hơn mỗi ngày 💓.

Anh yêu cách em cười, cách em nhìn anh âu yếm 🥰, và cả những lúc em nhẹ nhàng nắm lấy tay anh mà không nói một lời 🤝. Trong ánh mắt em, anh nhìn thấy cả tương lai mà anh hằng mong ước: một mái ấm bình yên, có em, có anh, cùng nhau đi qua bao mùa nắng mưa 🏡💑.

Và này, em đừng bỏ bữa nhé 🍽️, nhớ ngủ sớm 😴, giữ gìn sức khỏe và luôn mỉm cười thật nhiều 💕. Anh lúc nào cũng ở đây, thương em rất nhiều 💘. Dù mai sau có ra sao, thì em vẫn luôn là lý do khiến trái tim anh lỡ nhịp mỗi khi nhớ đến 💞.`,
        "loveMsg",
        () => {
          const fromTag = document.createElement("div");
          fromTag.id = "fromTag";
          fromTag.textContent = "From: Tuyền Huy With love";
          fromTag.style.marginTop = "20px";
          fromTag.style.opacity = "0";
          fromTag.style.transition = "opacity 1s ease";
          loveMsg.appendChild(fromTag);

          setTimeout(() => {
            fromTag.style.opacity = "1";
          }, 500);
        }
      );
    });
  }
}

async function inipesan() {
  const { value: typedName } = await Swal.fire({
    title: "Nhập Tên Của Bé Iuu đi",
    input: "text",
    inputValue: "",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: true,
    didOpen: () => Swal.getInput()?.focus(),
    preConfirm: () => Swal.getInput()?.value?.trim(),
  });

  if (typedName) {
    userName = typedName;
    loveTaps.clear();
    document
      .querySelectorAll(".love-icon")
      .forEach((icon) => icon.classList.remove("tapped"));
    switchStage("inputStage", "loveStage");
  } else {
    await Swal.fire({
      icon: "warning",
      title: "Ứ chịu đâu, Nhập tên của bé điiiii!!",
      confirmButtonText: "Nhập lại nàaa",
    });
    inipesan();
  }
}
