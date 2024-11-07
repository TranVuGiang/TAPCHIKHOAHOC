// utils/urlUtils.js

export function createUrlSlug(title) {
    return title
      .toLowerCase() // Chuyển thành chữ thường
      .normalize('NFD') // Chuẩn hóa unicode
      .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
      .replace(/[đĐ]/g, 'd') // Xử lý chữ đ
      .replace(/[^a-z0-9\s-]/g, '') // Chỉ giữ lại chữ cái, số và dấu gạch ngang
      .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
      .replace(/-+/g, '-') // Loại bỏ nhiều dấu gạch ngang liên tiếp
      .trim(); // Xóa khoảng trắng đầu cuối
  }