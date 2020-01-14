package cbuc.homestay.service;

import cbuc.homestay.bean.Comment;
import cbuc.homestay.bean.CommentExample;
import cbuc.homestay.mapper.CommentMapper;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Explain:   评论处理器
 * @Author: Cbuc
 * @Version: 1.0
 * @Date: 2020/1/13
 */
@Service
public class CommentService {

    @Autowired
    private CommentMapper commentMapper;

    public List<Comment> queryList(Comment comment) {
        CommentExample commentExample = new CommentExample();
        CommentExample.Criteria criteria = commentExample.createCriteria();
        if (StringUtils.isNotBlank(comment.getContent())) {
            criteria.andContentLike("%" + comment.getContent() + "%");
        }
        commentExample.setOrderByClause("ID DESC");
        return commentMapper.selectByExample(commentExample);
    }

    public Comment queryDetail(Long rid) {
        return commentMapper.selectByPrimaryKey(rid);
    }

    public int doEdit(Comment comment) {
        return commentMapper.updateByPrimaryKeySelective(comment);
    }
}