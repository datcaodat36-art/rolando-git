// =======================================
// ADMIN AUTHENTICATION SYSTEM (Firebase Authentication)
// Chỉ có DUY NHẤT 1 tài khoản Admin, được tạo sẵn trong Firebase Console
// (Authentication > Users). Website KHÔNG có chức năng đăng ký, và KHÔNG
// có đăng nhập cho người dùng thường — chỉ Admin mới đăng nhập được.
// =======================================

class AdminAuthSystem {
  constructor() {
    this.currentUser = null; // { uid, email } hoặc null nếu chưa đăng nhập
    this.authReady = false;  // true khi Firebase đã xác định xong trạng thái đăng nhập
    this.listeners = [];

    this._initAuthListener();
  }

  // Lắng nghe trạng thái đăng nhập Firebase theo thời gian thực. Nhờ vậy,
  // nếu Admin đăng nhập trên 1 tab và mở tab khác, hoặc phiên đăng nhập
  // hết hạn, giao diện sẽ tự cập nhật đúng trạng thái ngay lập tức.
  _initAuthListener() {
    if (typeof firebase === "undefined" || !firebase.apps || !firebase.apps.length) {
      // Chưa cấu hình Firebase (thiếu/điền sai firebase-config.js) — khoá
      // toàn bộ chức năng quản trị, người dùng vẫn xem được website bình thường.
      this.authReady = true;
      return;
    }

    firebase.auth().onAuthStateChanged((user) => {
      this.currentUser = user ? { uid: user.uid, email: user.email } : null;
      this.authReady = true;
      this.listeners.forEach(cb => {
        try { cb(this.currentUser); } catch (e) { console.error(e); }
      });
    });
  }

  // Đăng ký một callback sẽ được gọi mỗi khi trạng thái đăng nhập đổi.
  // Nếu Firebase đã sẵn sàng, gọi callback ngay với trạng thái hiện tại.
  onAuthChange(callback) {
    this.listeners.push(callback);
    if (this.authReady) callback(this.currentUser);
  }

  isFirebaseReady() {
    return typeof firebase !== "undefined" && !!(firebase.apps && firebase.apps.length);
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async login(email, password) {
    email = (email || "").trim();

    if (!email || !password) {
      return { success: false, code: "auth_err_login_fill" };
    }

    if (!this.isFirebaseReady()) {
      return { success: false, code: "auth_err_firebase_not_configured" };
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      return { success: true, code: "auth_login_success" };
    } catch (err) {
      return { success: false, code: this._mapFirebaseAuthError(err) };
    }
  }

  async logout() {
    if (this.isFirebaseReady()) {
      await firebase.auth().signOut();
    }
    return { success: true, code: "auth_logout_success" };
  }

  // Đổi mật khẩu Admin (cần đăng nhập lại bằng mật khẩu hiện tại trước,
  // đây là yêu cầu bảo mật bắt buộc của Firebase Authentication).
  async changePassword(currentPassword, newPassword, confirmPassword) {
    if (!this.isLoggedIn()) {
      return { success: false, code: "auth_err_not_logged_in" };
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { success: false, code: "auth_err_fill_all" };
    }

    if (newPassword.length < 6) {
      return { success: false, code: "auth_err_password_short" };
    }

    if (newPassword !== confirmPassword) {
      return { success: false, code: "auth_err_password_mismatch" };
    }

    try {
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPassword);
      return { success: true, code: "auth_change_password_success" };
    } catch (err) {
      return { success: false, code: this._mapFirebaseAuthError(err) };
    }
  }

  // Chuyển mã lỗi Firebase Auth sang khoá dịch (translations.js) phù hợp.
  _mapFirebaseAuthError(err) {
    const code = err && err.code;
    switch (code) {
      case "auth/invalid-email":
        return "auth_err_email_invalid";
      case "auth/user-not-found":
      case "auth/user-disabled":
        return "auth_err_username_not_found";
      case "auth/wrong-password":
      case "auth/invalid-credential":
      case "auth/invalid-login-credentials":
        return "auth_err_wrong_password";
      case "auth/too-many-requests":
        return "auth_err_too_many_requests";
      case "auth/requires-recent-login":
        return "auth_err_requires_recent_login";
      default:
        return "auth_err_generic";
    }
  }
}

// Khởi tạo hệ thống xác thực (dùng chung cho toàn site)
const adminAuth = new AdminAuthSystem();
