package com.eomcs.lms.web.json;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.eomcs.lms.domain.Member;
import com.eomcs.lms.domain.Reservation;
import com.eomcs.lms.service.MemberService;
import com.eomcs.lms.service.ReservationService;

@RestController("json/ReservationController")
@RequestMapping("/json/reservation")
public class ReservationController {

	@Autowired ReservationService reservationService;
	@Autowired MemberService memberService;

	@PostMapping("add")
	public Object add(Reservation reservation) throws Exception {
		HashMap<String,Object> content = new HashMap<>();
		try {
			reservationService.add(reservation);
			content.put("status", "success");
		} catch (Exception e) {
			content.put("status", "fail");
			content.put("message", e.getMessage());
		}
		return content;
	}

	@GetMapping("delete")
	public Object delete(int no) {
		HashMap<String,Object> content = new HashMap<>();
		try {
			if (reservationService.delete(no) == 0) 
				throw new RuntimeException("해당 번호의 예약내역이 없습니다.");
			content.put("status", "success");

		} catch (Exception e) {
			content.put("status", "fail");
			content.put("message", e.getMessage());
		}
		return content;



	}
	@GetMapping("myreservation")
	public Object myReservation(HttpSession session) {
		HashMap<String,Object> content = new HashMap<>();

		try {
			Member loginUser = (Member)session.getAttribute("loginUser");
			List<Reservation> reservations  = reservationService.getMyReservation(loginUser.getNo());
			content.put("list", reservations);

		} catch (Exception e) {
			content.put("status", "fail");
			content.put("message", e.getMessage());
			return content;
		}

		return content;
	}

	@GetMapping("detail")
	public Object detail(int no) {
		Reservation reservation  = reservationService.get(no);
		return reservation;
	}

	@GetMapping("list")
	public Object list(
			@RequestParam(defaultValue="1") int pageNo,
			@RequestParam(defaultValue="3") int pageSize, 
			String search,
			@RequestParam(defaultValue="0") int tourNo) {

		String searchWord = null;
		if (search.length() > 0) {
			searchWord = search;
		}
		
		if (pageSize < 3 || pageSize > 8) 
			pageSize = 3;

		int rowCount = reservationService.size(searchWord, tourNo);
		System.out.println("rowCount: " + rowCount);
		int totalPage = rowCount / pageSize;
		if (totalPage == 0 || rowCount % pageSize > 0)
			totalPage++;

		if (pageNo < 1) 
			pageNo = 1;
		else if (pageNo > totalPage)
			pageNo = totalPage;

		List<Reservation> reservations = reservationService.list(pageNo, pageSize, searchWord, tourNo);

		HashMap<String,Object> content = new HashMap<>();
		content.put("list", reservations);
		content.put("pageNo", pageNo);
		content.put("pageSize", pageSize);
		content.put("totalPage", totalPage);

		return content;
	}

	@PostMapping("update")
	public Object update(Reservation reservation) {
		HashMap<String,Object> content = new HashMap<>();
		try {
			if (reservationService.update(reservation) == 0) 
				throw new RuntimeException("해당 번호의 예약내역이 없습니다.");
			content.put("status", "success");

		} catch (Exception e) {
			content.put("status", "fail");
			content.put("message", e.getMessage());
		}
		return content;
	}
	@PostMapping("reservation")
	public Object reservation(Reservation reservation, HttpSession session) throws Exception {
		HashMap<String,Object> content = new HashMap<>();
		Member loginUser = (Member)session.getAttribute("loginUser");
		reservation.setMemberNo(loginUser.getNo());
		try {

			reservationService.add(reservation);

		} catch (Exception e) {
			content.put("status", "fail");
			content.put("message", e.getMessage());
		}
		content.put("status", "success");
		return content;
	}
	@PostMapping("test")
	public Object test(Reservation reservation) throws Exception {
		HashMap<String,Object> content = new HashMap<>();
		try {
			reservationService.add(reservation);
			content.put("status", "success");
		} catch (Exception e) {
			content.put("status", "fail");
			content.put("message", e.getMessage());
		}
		return content;
	}

	@GetMapping("nameGet")
	public Object emailOverlap(String email) {
		Member member = memberService.get(email);
		return member;
	}

	// find reservation by member no and completed reservation status
	@GetMapping("completedreservation")
	public Object completedReservation(HttpSession session) throws Exception {

		Member loginUser = (Member) session.getAttribute("loginUser");
		HashMap<String,Object> content = new HashMap<>();
		HashMap<String,Object> paramMap = new HashMap<>();

		if(session.getAttribute("loginUser") == null) {
			content.put("status", "notlogin");
			return content;
		}

		paramMap.put("memberNo", loginUser.getNo());
		try {
			List<Reservation> reservations = reservationService.findByCompletedReservation(paramMap);

			content.put("status", "success");
			content.put("reservations", reservations);
			content.put("amount", reservations.size());
		} catch (Exception e) {
			content.put("status", "fail");
			content.put("message", e.getMessage());
		}
		return content;
	}

	// find reservation by member no and completed reservation status
	@GetMapping("oldreservation")
	public Object oldReservation(HttpSession session) throws Exception {

		Member loginUser = (Member) session.getAttribute("loginUser");
		HashMap<String,Object> content = new HashMap<>();
		HashMap<String,Object> paramMap = new HashMap<>();

		if(session.getAttribute("loginUser") == null) {
			content.put("status", "notlogin");
			return content;
		}

		paramMap.put("memberNo", loginUser.getNo());
		try {

			List<Reservation> reservations = reservationService.findByOldReservation(paramMap);

			content.put("status", "success");
			content.put("reservations", reservations);
			content.put("amount", reservations.size());
		} catch (Exception e) {
			content.put("status", "fail");
			content.put("message", e.getMessage());
		}
		return content;
	}

	@GetMapping("tourlist")
	public Object tourlist() {

		List<Reservation> tourlists = reservationService.tourlist();
		HashMap<String,Object> content = new HashMap<>();
		content.put("tourlists", tourlists);
		return content;
	}

	
//	@GetMapping("search")
//	public Object search(
//			@RequestParam(defaultValue="1") int pageNo,
//			@RequestParam(defaultValue="3") int pageSize, 
//			int tourNo,
//			String tourDate) {
//
//		if (pageSize < 3 || pageSize > 8) 
//			pageSize = 3;
//
//		int rowCount = reservationService.size(tourNo, tourDate);
//		int totalPage = rowCount / pageSize;
//		if (totalPage == 0 || rowCount % pageSize > 0)
//			totalPage++;
//
//		if (pageNo < 1) 
//			pageNo = 1;
//		else if (pageNo > totalPage)
//			pageNo = totalPage;
//
//		List<Reservation> reservations = reservationService.list(pageNo, pageSize, tourNo, tourDate);
//
//		HashMap<String,Object> content = new HashMap<>();
//		content.put("list", reservations);
//		content.put("pageNo", pageNo);
//		content.put("pageSize", pageSize);
//		content.put("totalPage", totalPage);
//
//		return content;
//	}
}
