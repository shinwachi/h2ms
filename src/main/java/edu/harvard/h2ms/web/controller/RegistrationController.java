package edu.harvard.h2ms.web.controller;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.harvard.h2ms.domain.core.User;
import edu.harvard.h2ms.repository.UserRepository;

@Controller
public class RegistrationController {
	
	@Autowired
	private UserRepository userRepository;
	
//	@RequestMapping(value = "/user/resetPassword", method = RequestMethod.POST)
//	@ResponseBody
//	public GenericResponse resetPassword(final HttpServletRequest request, @RequestParam("email") final String userEmail) {
//		final User user = userRepository.findByEmail(userEmail);
//		if (user == null) {
//			throw new UserNotFoundException();
//		}
//		String token = UUID.randomUUID().toString();
//		mailSender.send(constructResetTokenEmail(getAppUrl(request), token, user));
//		return new GenericResponse(messages.getMessage("message.resetPasswordEmail", null, request.getLocale()));
		
//		if (user != null) {
//			model.addAttribute("message", messages.getMessage("auth.message." + result, null, locale));
//			return "redirect:/login";
//		}
//	}
	
	

}
